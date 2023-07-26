import { TNote } from "@/types/Note";
import {
  ArrowPathIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CheckIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { Button } from "framework7-react";
import ReactButton from "./ReactButton";
import ZapButton from "./ZapButton";
import { useSessionStore } from "@/libs/zustand/session";
import { useNDK } from "@/libs/ndk";
import { useFeedCommunityApprovePost } from "@/libs/ndk/hooks/useFeedCommunityApprovePost";
import { useEffect } from "react";
import { useNoteStats } from "@/libs/api.nostr.band/useNoteStats";
import numberFormatter from "@/libs/kiwi/displays/numberFormatter";
import { useUserReactions } from "@/libs/ndk/hooks/useUserReactions";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionNoteStore } from "@/libs/zustand/sessionNoteStore";
import { useColor } from "@/libs/kiwi/displays/useColor";

export default function NoteActionBar({
  note,
  canReply = false,
  noteApprove = false,
}: {
  note: TNote;
  canReply?: boolean;
  noteApprove?: boolean;
}) {
  const user = usePersistUserStore((state) => state.user);

  const { signer } = useNDK();
  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setNoteEditorMetadata = useSessionNoteStore(
    (state) => state.setNoteEditorMetadata
  );
  const color = useColor();
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const { data: userReactions } = useUserReactions(user?.pk);

  const { mutate, isSuccess, isError } = useFeedCommunityApprovePost();

  // const { data: reactions } = useNoteReaction(
  //   ENABLE_REACTIONS ? note?.id : undefined
  // );

  const { data: stats } = useNoteStats(note.id);

  // let reactionCountDisplay: undefined | number = undefined;

  // if (reactions) {
  //   reactionCountDisplay = Object.keys(reactions.reactions).reduce(function (
  //     acc,
  //     reaction
  //   ) {
  //     if (reaction == "-") {
  //       acc -= reactions.reactions[reaction];
  //     } else {
  //       acc += reactions.reactions[reaction];
  //     }
  //     return acc;
  //   },
  //   0);
  // }

  async function handleApproveNote() {
    mutate(note);
  }

  useEffect(() => {
    if (isSuccess) {
      setToastMessage("Note approved");
    }
    if (isError) {
      setToastMessage("Error approving note");
    }
  }, [isSuccess, isError]);

  let reactionCount = 0;
  if (stats?.react) {
    reactionCount += stats.react;
  }
  if (userReactions && note.id in userReactions) {
    reactionCount += userReactions[note.id].length;
  }

  function clickedMessageButton() {
    if (note) {
      if (canReply) {
        setNoteEditorMetadata({
          replyNote: {
            id: note.id,
            authorPk: note?.author,
            tags: note?.tags,
          },
        });
        setAppPopup({ composeNote: { show: true, replyNote: note } });
      }
    }
  }

  return (
    <div className="flex space-x-2 mt-4">
      {/* <Button clear colors={{ textIos: "#ffffff" }}>
        <ClockIcon className={`w-4 h-4`} />
        <span className="text-xs ml-1">
          {note.created_at && getDateTimeSince(note.created_at)}
        </span>
      </Button> */}

      <div className="flex">
        <ReactButton
          note={note}
          reaction="+"
          icon={<HandThumbUpIcon className={`w-4 h-4`} />}
        />

        <span
          className={`flex items-center ${
            userReactions && note.id in userReactions ? "text-[#7E81FF]" : ""
          }`}
        >
          {reactionCount}
        </span>

        <ReactButton
          note={note}
          reaction="-"
          icon={<HandThumbDownIcon className={`w-4 h-4`} />}
        />
      </div>

      <div className="flex-1"></div>

      <div className="flex">
        <Button
          color={!note.reposted ? color : "primary"}
          onClick={() => setAppActionSheet({ repost: note })}
          disabled={!signer}
        >
          <ArrowPathIcon className={`w-4 h-4`} />
          {stats && stats.repost > 0 && (
            <span className="ml-2">{stats.repost}</span>
          )}
        </Button>

        {/* todo add zap */}
        <ZapButton note={note} amount={numberFormatter(stats?.zapsAmt || 0)} />

        {noteApprove && (
          <Button
            color={color}
            onClick={() => handleApproveNote()}
            disabled={!signer}
          >
            <CheckIcon className={`w-4 h-4`} />
          </Button>
        )}

        {canReply && (
          <Button color={color} onClick={() => clickedMessageButton()}>
            <ChatBubbleOvalLeftEllipsisIcon className={`w-4 h-4`} />
          </Button>
        )}
      </div>

      {/* {showApproval && (
              <Button
                clear
                colors={{ textIos: "#ffffff" }}
                onClick={() => handleApproveNote()}
                disabled={!hasSigner || loading}
              >
                <CheckIcon className={`w-4 h-4`} />
              </Button>
            )} */}
    </div>
  );
}

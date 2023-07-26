import { TNote } from "@/types/Note";
import { Block, Link } from "framework7-react";
import NoteActionBar from "./NoteActionBar";
import { useNote } from "@/libs/ndk/hooks/useNote";
import UserHeader from "../../user/UserHeader";
import { FeedViews } from "@/types/App";
import { useSessionNoteStore } from "@/libs/zustand/sessionNoteStore";
import NoteContent from "./NoteContent";

export default function NoteBlock({
  note,
  eventId,
  canReply,
  hideActionBar = false,
  rightOptions = undefined,
  noteApprove,
  noteView = FeedViews.users,
}: {
  note?: TNote;
  eventId?: string;
  canReply?: boolean;
  hideActionBar?: boolean;
  rightOptions?: React.ReactNode;
  noteApprove?: boolean;
  noteView?: FeedViews;
}) {
  const setNotePanel = useSessionNoteStore((state) => state.setNotePanel);

  const { data: note2 } = useNote(eventId);

  if (note2) {
    note = note2;
  }

  if (note === undefined) return <></>;

  return (
    <>
      <Block
        className="bg-white dark:bg-[#1c1c1d] my-1 py-4"
        // colors={
        //   noteEditorMetadata &&
        //   noteEditorMetadata.replyNote &&
        //   noteEditorMetadata.replyNote.id === _note.id
        //     ? {
        //         strongBgIos: "bg-[#262230]",
        //         strongBgMaterial: "bg-[#262230]",
        //       }
        //     : {}
        // }
      >
        <UserHeader
          note={note}
          noteView={noteView}
          rightOptions={rightOptions}
        />

        {canReply ? (
          <NoteContent note={note} />
        ) : (
          <Link href={`/note/${note.id}`}>
            <NoteContent note={note} />
            {/* <ContentParser note={note} /> */}
          </Link>
        )}

        {!hideActionBar && (
          <NoteActionBar
            note={note}
            noteApprove={noteApprove}
            canReply={canReply}
          />
        )}
      </Block>
    </>
  );
}

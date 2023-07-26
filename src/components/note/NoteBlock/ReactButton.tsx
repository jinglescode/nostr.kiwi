import useLongPress from "@/hooks/useLongPress";
import { useColor } from "@/libs/kiwi/displays/useColor";
import { useNDK } from "@/libs/ndk";
import { useUserReactions } from "@/libs/ndk/hooks/useUserReactions";
import { useUserReactionsPost } from "@/libs/ndk/hooks/useUserReactionsPost";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TNote } from "@/types/Note";
import { Button } from "framework7-react";
import { useEffect } from "react";

export default function ReactButton({
  note,
  reaction,
  icon,
}: {
  note: TNote;
  reaction: string;
  icon: React.ReactNode;
}) {
  const color = useColor();
  const user = usePersistUserStore((state) => state.user);

  const { signer } = useNDK();
  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const backspaceLongPress = useLongPress(clickedHoldReaction, 500);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const { data: userReactions } = useUserReactions(user?.pk);
  const { mutate, isError } = useUserReactionsPost();

  function clickedHoldReaction() {
    setAppDialog({ reaction: { note: note } });
  }

  useEffect(() => {
    if (isError) {
      setToastMessage("Error reacting to note");
    }
  }, [isError]);

  async function _reactToNote() {
    if (!signer) return;
    mutate({ noteId: note.id, content: reaction });
  }

  return (
    <>
      <Button
        color={
          userReactions && note.id in userReactions
            ? userReactions[note.id].includes(reaction)
              ? "primary"
              : color
            : color
        }
        onClick={() => _reactToNote()}
        disabled={!signer}
        {...backspaceLongPress}
      >
        {icon}
      </Button>
    </>
  );
}

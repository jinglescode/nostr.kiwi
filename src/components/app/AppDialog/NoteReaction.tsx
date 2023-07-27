import { useNDK } from "@/libs/ndk";
import { useUserReactionsPost } from "@/libs/ndk/hooks/useUserReactionsPost";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useSessionStore } from "@/libs/zustand/session";
import { f7 } from "framework7-react";
import { useEffect } from "react";

export default function NoteReactionDialog() {
  const reactions = usePersistSettingsStore((state) => state.reactions);
  const { signer } = useNDK();
  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const { mutate, isSuccess, isError } = useUserReactionsPost();

  const note = appDialog?.reaction?.note;

  useEffect(() => {
    if (isSuccess) {
      setAppDialog({ reaction: undefined });
    }
    if (isError) {
      setToastMessage("Error reacting to note");
      setAppDialog({ reaction: undefined });
    }
  }, [isSuccess, isError]);

  async function react(reaction: string) {
    if (!signer || note == undefined) return;
    mutate({ noteId: note.id, content: reaction });
    setAppDialog({ reaction: undefined });
  }

  useEffect(() => {
    if (appDialog?.reaction !== undefined) {
      f7.dialog
        .create({
          title: "React to Note",
          buttons: reactions.map((reaction, i) => ({
            text: reaction,
            onClick: () => {
              react(reaction);
            },
          })),
          verticalButtons: true,
        })
        .open();
    }
  }, [appDialog?.reaction]);

  return <></>;
}

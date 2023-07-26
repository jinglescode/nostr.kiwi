import { useNDK } from "@/libs/ndk";
import { useSessionStore } from "@/libs/zustand/session";
import { useSessionNoteStore } from "@/libs/zustand/sessionNoteStore";
import { TCommunity } from "@/types/Community";
import { Fab, Icon } from "framework7-react";

export default function NoteComposeFab({
  community,
}: {
  community?: TCommunity;
}) {
  // const { signer } = useNDK();
  const signer = true;

  const setAppPopup = useSessionStore((state) => state.setAppPopup);
  const setNoteEditorMetadata = useSessionNoteStore(
    (state) => state.setNoteEditorMetadata
  );

  return (
    <>
      {signer && (
        <Fab
          className="fixed"
          position="right-bottom"
          slot="fixed"
          onClick={() => {
            setNoteEditorMetadata({ community });
            setAppPopup({
              composeNote: {
                show: true,
                community: community,
              },
            });
          }}
        >
          <Icon ios="f7:pencil" md="material:edit" />
        </Fab>
      )}
    </>
  );
}

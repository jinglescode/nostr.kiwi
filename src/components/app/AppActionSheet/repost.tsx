import { useNDK } from "@/libs/ndk";
import { useSessionStore } from "@/libs/zustand/session";
import { useSessionNoteStore } from "@/libs/zustand/sessionNoteStore";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import {
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
} from "framework7-react";

export default function AppActionsRepost() {
  const { signer, signPublishEvent, fetchEvents } = useNDK();

  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const setNoteEditorMetadata = useSessionNoteStore(
    (state) => state.setNoteEditorMetadata
  );
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const repost = appActionSheet?.repost;

  async function _repost() {
    if (signer === undefined || repost === undefined) return;

    let filter: NDKFilter = {
      ids: [repost.id],
    };

    const events = await fetchEvents(filter);
    if (events.length === 0 || events.length > 1) return;
    const success = await signPublishEvent(events[0], true);

    if (success) {
      repost.reposted = true;
      setToastMessage("Note reposted.");
      setAppActionSheet(undefined);
    } else {
      setToastMessage("Failed to post note");
    }
  }

  async function _quote() {
    if (signer === undefined || repost === undefined) return;
    setAppActionSheet(undefined);
    setAppPopup({
      composeNote: { show: true },
    });
    setNoteEditorMetadata({
      quoteNote: { id: repost.id, authorPk: repost.author },
    });
  }

  async function _repostToCommunity() {
    if (signer === undefined || repost === undefined) return;
    setAppDialog({ repostNoteToCommunity: { noteId: repost.id } });
    setAppActionSheet(undefined);
  }

  return (
    <>
      {appActionSheet && repost && (
        <ActionsGroup>
          <ActionsLabel>Repost Note</ActionsLabel>
          <ActionsButton onClick={() => _repost()}>Repost</ActionsButton>
          <ActionsButton onClick={() => _quote()}>Quote Repost</ActionsButton>
          <ActionsButton onClick={() => _repostToCommunity()}>
            Repost to Community
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

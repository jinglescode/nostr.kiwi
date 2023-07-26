import { useClipboard } from "@/hooks/useCopyClipboard";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";
import { useSessionStore } from "@/libs/zustand/session";
import { encodeNote } from "@/libs/ndk/utils/note";
import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useEffect, useState } from "react";

export default function AppActionsNote() {
  const { fetchEvents } = useNDK();

  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const [eventJson, setEventJson] = useState<string>("");
  const [eventContent, setEventContent] = useState<string>("");

  const note = appActionSheet?.note;

  const {
    value: valueNoteId,
    onCopy: copyNoteId,
    hasCopied: hasCopiedNoteId,
  } = useClipboard(note ? encodeNote(note.id) : "");

  async function getNoteEvent() {
    if (note === undefined) return;

    let filter: NDKFilter = {
      ids: [note.id],
    };

    const events = await fetchEvents(filter);
    if (events.length === 0 || events.length > 1) return;

    return events[0];
  }

  useEffect(() => {
    async function load() {
      const event = await getNoteEvent();
      if (event) {
        setEventJson(JSON.stringify(event.rawEvent()));
        setEventContent(event.content);
      }
    }
    load();
  }, [note]);

  const {
    value: valueNoteEvent,
    onCopy: copyNoteEvent,
    hasCopied: hasCopiedNoteEvent,
  } = useClipboard(eventJson);

  const {
    value: valueNoteContent,
    onCopy: copyNoteContent,
    hasCopied: hasCopiedNoteContent,
  } = useClipboard(eventContent);

  function _copyNoteId() {
    copyNoteId();
    setAppActionSheet(undefined);
    setToastMessage("Note ID copied to clipboard");
  }

  function _copyNoteEvent() {
    copyNoteEvent();
    setAppActionSheet(undefined);
    setToastMessage("Note JSON copied to clipboard");
  }

  function _copyNoteContent() {
    copyNoteContent();
    setAppActionSheet(undefined);
    setToastMessage("Note content copied to clipboard");
  }

  return (
    <>
      {appActionSheet && note && (
        <ActionsGroup>
          <ActionsLabel>Note</ActionsLabel>
          <ActionsButton onClick={() => _copyNoteId()}>
            Copy Note ID
          </ActionsButton>
          <ActionsButton onClick={() => _copyNoteEvent()}>
            Copy Note JSON
          </ActionsButton>
          <ActionsButton onClick={() => _copyNoteContent()}>
            Copy Note Content
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

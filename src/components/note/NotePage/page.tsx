import { Navbar, Page } from "framework7-react";
import NoteBlock from "../NoteBlock";
import { useNoteReplies } from "@/libs/ndk/hooks/useNoteReplies";
import { useNote } from "@/libs/ndk/hooks/useNote";
import { nip19 } from "nostr-tools";
import { TNote } from "@/types/Note";
import NoteReplies from "../NoteReplies";

export default function NotePage({ note, id }: { note?: TNote; id?: string }) {
  let eventId = undefined;

  if (id !== undefined && id.includes("note1")) {
    eventId = nip19.decode(id).data as string | nip19.EventPointer;
    eventId = typeof eventId === "string" ? eventId : eventId.id;
  } else if (id !== undefined) {
    eventId = id;
  }

  const { data: note2 } = useNote(eventId, false);
  if (note2) {
    note = note2;
  }

  const { data } = useNoteReplies(note?.id);

  if (note === undefined) return <></>;

  return (
    <Page>
      <Navbar title="Note" backLink="Back"></Navbar>
      <NoteBlock note={note} canReply={true} />
      <NoteReplies replies={data} />
    </Page>
  );
}

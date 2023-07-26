import { useSessionStore } from "@/libs/zustand/session";
import { useEffect } from "react";
import { useSessionNoteStore } from "@/libs/zustand/sessionNoteStore";
import NoteBlock from "../../note/NoteBlock";
import NoteEditor from "@/components/note/NoteEditor";

export default function ComposeNotePopup() {
  const appPopup = useSessionStore((state) => state.appPopup);
  const setNoteEditorHeight = useSessionNoteStore(
    (state) => state.setNoteEditorHeight
  );

  useEffect(() => {
    setNoteEditorHeight(200);
  }, []);

  if (appPopup === undefined || appPopup.composeNote === undefined)
    return <></>;

  return (
    <>
      {appPopup && appPopup.composeNote.replyNote !== undefined && (
        <NoteBlock note={appPopup.composeNote.replyNote} hideActionBar={true} />
      )}

      <NoteEditor />
    </>
  );
}

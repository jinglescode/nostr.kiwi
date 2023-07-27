import { Link, NavRight, Navbar, Popup } from "framework7-react";
import NotePage from "../NotePage/page";
import { useSessionNoteStore } from "@/libs/zustand/sessionNoteStore";

export default function NotePopup() {
  const notePanel = useSessionNoteStore((state) => state.notePanel);
  const setNotePanel = useSessionNoteStore((state) => state.setNotePanel);

  return (
    <Popup
      swipeToClose
      opened={notePanel?.note !== undefined}
      onPopupClosed={() => setNotePanel({ note: undefined })}
    >
      <Navbar title="Note">
        <NavRight>
          <Link popupClose>Close</Link>
        </NavRight>
      </Navbar>
      {notePanel?.note && <NotePage note={notePanel.note} />}
    </Popup>
  );
}

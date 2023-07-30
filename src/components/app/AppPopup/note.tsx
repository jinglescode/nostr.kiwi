import NotePage from "@/components/note/NotePage/page";
import { useSessionStore } from "@/libs/zustand/session";

export default function NotePopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.note === undefined) return <></>;

  return <NotePage note={appPopup.note} />;
}

import { useSessionStore } from "@/libs/zustand/session";
import SettingsPage from "../../settings";

export default function SettingsPopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.settings === undefined) return <></>;

  return <SettingsPage />;
}

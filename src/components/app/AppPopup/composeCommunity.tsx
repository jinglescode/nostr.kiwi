import { useSessionStore } from "@/libs/zustand/session";
import CommunityEditor from "../../community/CommunityEditor";

export default function ComposeCommunityPopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.composeCommunity === undefined)
    return <></>;

  return <CommunityEditor />;
}

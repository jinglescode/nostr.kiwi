import { useSessionStore } from "@/libs/zustand/session";
import CommunityInfoPage from "../../community/CommunityInfoPage";

export default function CommunityPopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.community === undefined) return <></>;

  const community = appPopup.community;

  return (
    <>
      <CommunityInfoPage id={community.id} />
    </>
  );
}

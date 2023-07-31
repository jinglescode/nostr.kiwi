import { useCommunity } from "@/libs/ndk/hooks/useCommunity";
import { useSessionStore } from "@/libs/zustand/session";
import CommunityApproveNotesPage from "./approveNotes";
import CommunityArticlesPage from "./articles";
import CommunityFeedsPage from "./feeds";
import { useEffect } from "react";
import Chat from "@/components/chat";

export default function CommunityContent({ id }: { id: string }) {
  const communityView = useSessionStore((state) => state.communityView);
  const setCommunityView = useSessionStore((state) => state.setCommunityView);

  const { data: community } = useCommunity(id);

  useEffect(() => {
    setCommunityView("feed");
  }, []);

  if (community === undefined) return <></>;

  return (
    <>
      {communityView == "feed" && community && (
        <CommunityFeedsPage community={community} />
      )}

      {communityView == "articles" && community && (
        <CommunityArticlesPage community={community} />
      )}

      {communityView == "approve" && community && (
        <CommunityApproveNotesPage community={community} />
      )}

      {communityView == "chat" && community && <Chat community={community} />}
    </>
  );
}

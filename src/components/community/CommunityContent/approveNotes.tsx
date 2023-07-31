import FeedLayout from "@/components/app/layouts/feed";
import { useFeedCommunityApprove } from "@/libs/ndk/hooks/useFeedCommunityApprove";
import { TCommunity } from "@/types/Community";

export default function CommunityApproveNotesPage({
  community,
}: {
  community: TCommunity;
}) {
  const { pendingNotes } = useFeedCommunityApprove(community);

  return (
    <FeedLayout
      feed={pendingNotes}
      noteApprove={true}
    />
  );
}

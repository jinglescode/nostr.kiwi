// import CommunityFollowButton from "@/components/ui/community/CommunityFollowButton";
import FeedLayout from "@/components/app/layouts/feed";
import { useNDK } from "@/libs/ndk";
import { useFeedCommunity } from "@/libs/ndk/hooks/useFeedCommunity";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TCommunity } from "@/types/Community";
import NoteComposeFab from "@/components/note/NoteComposeFab";

export default function CommunityFeedsPage({
  community,
}: {
  community: TCommunity;
}) {
  const { signer } = useNDK();
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const communityShowAllNotes = usePersistSettingsStore(
    (state) => state.communityShowAllNotes
  );

  const {
    data: feed,
    isFetching,
    status,
    refetch,
  } = useFeedCommunity(
    community.id,
    community.moderators,
    communityShowAllNotes
  );

  return (
    <>
      {/* <Block>
        <div className="flex w-full">
          <div className="flex-1 overflow-hidden mr-2">
            <p>{community?.description}</p>
          </div>
          {signer && <CommunityFollowButton community={community} />}
        </div>
        <Link href={`/communities/${community.id}/info`} color="primary">
          See community info
        </Link>
      </Block> */}
      <FeedLayout feed={feed} isFetching={isFetching} refetch={refetch} />
      <NoteComposeFab community={community} />
    </>
  );
}

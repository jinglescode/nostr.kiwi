// import CommunityFollowButton from "@/components/ui/community/CommunityFollowButton";
import FeedLayout from "@/components/app/layouts/feed";
import { useFeedCommunity } from "@/libs/ndk/hooks/useFeedCommunity";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { TCommunity } from "@/types/Community";
import NoteComposeFab from "@/components/note/NoteComposeFab";
import { Page } from "framework7-react";

export default function CommunityFeedsPage({
  community,
}: {
  community: TCommunity;
}) {
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

  async function ptrRerefresh(done: Function) {
    if (refetch) {
      await refetch();
    }
    done();
  }

  return (
    <Page ptr onPtrRefresh={ptrRerefresh}>
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
    </Page>
  );
}

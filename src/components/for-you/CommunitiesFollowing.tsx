import { useFeedCommunities } from "@/libs/ndk/hooks/useFeedCommunities";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { FeedViews } from "@/types/App";
import FeedLayout from "../app/layouts/feed";

export default function CommunitiesFollowing() {
  const user = usePersistUserStore((state) => state.user);

  const { data: userCommunities } = useUserCommunitiesFollowed(user?.pk);
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(
    user?.pk
  );
  const communityShowAllNotes = usePersistSettingsStore(
    (state) => state.communityShowAllNotes
  );

  let ids = undefined;
  if (userCommunities !== undefined && userCommunitiesModerator !== undefined) {
    ids = [
      ...(userCommunities ? userCommunities : []),
      ...(userCommunitiesModerator
        ? userCommunitiesModerator.map((community) => community.id)
        : []),
    ];
  }

  const { isFetching, data, status } = useFeedCommunities({
    ids: ids,
    queryKey: "followedCommunities",
    showAllNotes: communityShowAllNotes,
  });

  return (
    <>
      <FeedLayout
        feed={data}
        isFetching={isFetching}
        noteView={FeedViews.communities}
      />
    </>
  );
}

import { useCommunities } from "@/libs/ndk/hooks/useCommunities";
import { useFeedCommunitiesGlobal } from "@/libs/ndk/hooks/useFeedCommunitiesGlobal";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { useEffect, useState } from "react";

export default function useCommuntiesList({
  inputSearch,
  pk,
  selectedCommunities,
}: {
  inputSearch?: string;
  pk?: string;
  selectedCommunities?: string[];
}) {
  const [communitiesActivityCount, setCommunitiesActivityCount] = useState<{
    [id: string]: number;
  }>({});

  const { isFetching, data: communities } = useCommunities();

  const { data: userCommunitiesFollowed } = useUserCommunitiesFollowed(pk);
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(pk);
  const { data: globalCommunitiesFeed } = useFeedCommunitiesGlobal();

  // sort communities by activity
  useEffect(() => {
    let _communitiesActivityCount: { [id: string]: number } = {};

    if (globalCommunitiesFeed) {
      for (let i = 0; i < globalCommunitiesFeed.length; i++) {
        const note = globalCommunitiesFeed[i];

        const communityId = note.communityId;

        if (communityId) {
          if (!_communitiesActivityCount[communityId]) {
            _communitiesActivityCount[communityId] = 0;
          }

          _communitiesActivityCount[communityId] += 1;
        }
      }
    }

    setCommunitiesActivityCount(_communitiesActivityCount);
  }, [globalCommunitiesFeed]);

  let pinnedCommunities: string[] = [];
  if (userCommunitiesFollowed) {
    pinnedCommunities = [...userCommunitiesFollowed];
  }
  if (userCommunitiesModerator) {
    pinnedCommunities = [
      ...pinnedCommunities,
      ...userCommunitiesModerator.map((community) => community.id),
    ];
  }

  return communities
    ? communities
        .filter((community) => {
          if (selectedCommunities !== undefined) {
            if (selectedCommunities.includes(community.id)) {
              return true;
            } else {
              return false;
            }
          }
          if (!inputSearch) {
            return true;
          }
          if (community) {
            let thisCommunity = "";
            if (community.name) thisCommunity += community.name.toLowerCase();
            if (community.description)
              thisCommunity += community.description.toLowerCase();
            return thisCommunity.includes(inputSearch);
          }
          return false;
        })
        .sort((a, b) => {
          let _a = communitiesActivityCount[a.id] || 0;
          let _b = communitiesActivityCount[b.id] || 0;

          if (pinnedCommunities.includes(a.id)) {
            _a += 1000;
          }
          if (pinnedCommunities.includes(b.id)) {
            _b += 1000;
          }

          return _b - _a;
        })
    : [];
}

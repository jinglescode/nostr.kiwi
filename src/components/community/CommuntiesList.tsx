import { useCommunities } from "@/libs/ndk/hooks/useCommunities";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";

export default function useCommuntiesList({
  inputSearch,
}: {
  inputSearch: string;
}) {
  const { isFetching, data: communities } = useCommunities();

  const user = usePersistUserStore((state) => state.user);
  const { data: userCommunitiesFollowed } = useUserCommunitiesFollowed(
    user?.pk
  );
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(
    user?.pk
  );

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

  return (
    communities &&
    communities
      .filter((community) => {
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
        if (inputSearch.length) {
          if (a.name.toLowerCase().includes(inputSearch)) {
            return -1;
          }
          if (b.name.toLowerCase().includes(inputSearch)) {
            return 1;
          }
        }
        return 0;
      })
      .sort((a, b) => {
        if (pinnedCommunities.includes(a.id)) {
          return -1;
        }
        if (pinnedCommunities.includes(b.id)) {
          return 1;
        }
        return 0;
      })
      .map((community, i) => {
        return community;
      })
  );
}

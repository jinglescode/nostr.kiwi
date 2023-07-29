import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import CommunitiesList from "../communities/CommunitiesList";

export default function UserCommunities({ pk }: { pk: string }) {
  const { data: userCommunitiesFollowed } = useUserCommunitiesFollowed(pk);
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(pk);

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
    <>
      <CommunitiesList pk={pk} selectedCommunities={pinnedCommunities} />
    </>
  );
}

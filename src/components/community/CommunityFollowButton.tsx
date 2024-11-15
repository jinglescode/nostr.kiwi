import { useNDK } from "@/libs/ndk";
import { useUserCommunitiesFollowedPost } from "@/libs/ndk/hooks/useUserCommunitiesFollowedPost";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { TCommunity } from "@/types/Community";
import { Button } from "framework7-react";
import { useEffect, useState } from "react";

export default function CommunityFollowButton({
  community,
}: {
  community: TCommunity | undefined;
}) {
  const { signer } = useNDK();
  const user = usePersistUserStore((state) => state.user);
  const { mutate, isSuccess, isError } = useUserCommunitiesFollowedPost();
  const { data: userCommunities } = useUserCommunitiesFollowed(user?.pk);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      setLoading(false);
    }
  }, [isSuccess, isError]);

  async function update() {
    if (community === undefined) return;

    let updatedUserCommunities: string[] = [];

    if (userCommunities !== undefined) {
      updatedUserCommunities = [...userCommunities];
    }

    if (userCommunities?.includes(community.id)) {
      var index = updatedUserCommunities.indexOf(community.id);
      if (index !== -1) {
        updatedUserCommunities.splice(index, 1);
      }
    } else {
      updatedUserCommunities.push(community.id);
    }

    setLoading(true);
    mutate({ ids: updatedUserCommunities, communityId: community.id });
  }

  if (signer == undefined || community === undefined) return <></>;

  return (
    <Button
      fill
      round
      onClick={() => update()}
      className="text-xs"
      disabled={loading}
    >
      {loading ? (
        <>...</>
      ) : (
        <>{userCommunities?.includes(community.id) ? "Joined" : "Join"}</>
      )}
    </Button>
  );
}

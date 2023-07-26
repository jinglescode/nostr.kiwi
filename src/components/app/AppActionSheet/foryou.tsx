import { useFeedAuthors } from "@/libs/ndk/hooks/useFeedAuthors";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { useUserFollowings } from "@/libs/ndk/hooks/useUserFollowings";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsForyou() {
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

  const foryou = appActionSheet?.foryou;

  const user = usePersistUserStore((state) => state.user);

  const { data: followings } = useUserFollowings(user!.pk);

  const { refetch } = useFeedAuthors(followings, "followings");
  const { refetch: refetchuserCommunities } = useUserCommunitiesFollowed(
    user?.pk
  );
  const { refetch: refetchuserCommunitiesModerator } =
    useUserCommunitiesModerator(user?.pk);

  return (
    <>
      {appActionSheet && foryou && (
        <ActionsGroup>
          <ActionsLabel>Feed</ActionsLabel>
          <ActionsButton
            onClick={() => {
              refetch();
              refetchuserCommunities();
              refetchuserCommunitiesModerator();
              setAppActionSheet(undefined);
            }}
          >
            Refetch Latest Feed
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

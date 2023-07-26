import { useFeedAuthors } from "@/libs/ndk/hooks/useFeedAuthors";
import { useUserFollowings } from "@/libs/ndk/hooks/useUserFollowings";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import FeedLayout from "../app/layouts/feed";

export default function UsersFollowing() {
  const user = usePersistUserStore((state) => state.user);

  const { data: followings, refetch } = useUserFollowings(user!.pk);

  let _followings: string[] | undefined = undefined;
  if (followings) {
    _followings = [...followings, user!.pk];
  }

  const { isFetching, data, status } = useFeedAuthors(
    _followings,
    "followings"
  );

  return <FeedLayout feed={data} isFetching={isFetching} refetch={refetch} />;
}

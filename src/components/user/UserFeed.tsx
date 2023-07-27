import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import { useFeedAuthors } from "@/libs/ndk/hooks/useFeedAuthors";
import FeedLayout from "../app/layouts/feed";

export default function UserFeed({ npubOrPk }: { npubOrPk: string }) {
  const { data: user } = useUserProfile(npubOrPk);

  const {
    data: feed,
    isFetching,
    status,
    refetch,
  } = useFeedAuthors(user ? [user.pk] : undefined, user ? user.pk : undefined);

  if (user === undefined) return <></>;

  return <FeedLayout feed={feed} isFetching={isFetching} refetch={refetch} />;
}

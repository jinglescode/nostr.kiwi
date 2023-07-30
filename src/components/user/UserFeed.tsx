import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import { useFeedAuthors } from "@/libs/ndk/hooks/useFeedAuthors";
import FeedLayout from "../app/layouts/feed";
import { Page } from "framework7-react";

export default function UserFeed({ npubOrPk }: { npubOrPk: string }) {
  const { data: user } = useUserProfile(npubOrPk);

  const {
    data: feed,
    isFetching,
    status,
    refetch,
  } = useFeedAuthors(user ? [user.pk] : undefined, user ? user.pk : undefined);

  async function ptrRerefresh(done: Function) {
    if (refetch) {
      await refetch();
    }
    done();
  }

  if (user === undefined) return <></>;

  return (
    <Page ptr onPtrRefresh={ptrRerefresh}>
      <FeedLayout feed={feed} isFetching={isFetching} refetch={refetch} />
    </Page>
  );
}

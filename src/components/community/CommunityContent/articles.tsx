import FeedLayout from "@/components/app/layouts/feed";
import { useFeedCommunityArticles } from "@/libs/ndk/hooks/useFeedCommunityArticles";
import { TCommunity } from "@/types/Community";
import { Fab, Icon } from "framework7-react";

export default function CommunityArticlesPage({
  community,
}: {
  community: TCommunity;
}) {
  const {
    data: articles,
    isFetching: isFetchingLongform,
    status,
    refetch,
  } = useFeedCommunityArticles(community.id, community?.moderators);

  return (
    <>
      <FeedLayout
        feed={articles}
        isFetching={isFetchingLongform}
        refetch={refetch}
      />
      <Fab
        className="fixed right-4-safe bottom-20-safe z-20"
        href="https://habla.news/"
        target="_blank"
      >
        <Icon ios="f7:pencil" md="material:edit" />
      </Fab>
    </>
  );
}

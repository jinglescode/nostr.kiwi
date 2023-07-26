import { useFeedCommunitiesGlobal } from "@/libs/ndk/hooks/useFeedCommunitiesGlobal";
import { FeedViews } from "@/types/App";
import FeedLayout from "../app/layouts/feed";

export default function CommunitiesGlobal() {
  const { isFetching, data, refetch } = useFeedCommunitiesGlobal();

  return (
    <>
      <FeedLayout
        feed={data}
        isFetching={isFetching}
        noteView={FeedViews.communities}
        refetch={refetch}
      />
    </>
  );
}

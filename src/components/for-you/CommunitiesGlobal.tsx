import { useFeedCommunitiesGlobal } from "@/libs/ndk/hooks/useFeedCommunitiesGlobal";
import { FeedViews } from "@/types/App";
import FeedLayout from "../app/layouts/feed";
import { Page } from "framework7-react";

export default function CommunitiesGlobal() {
  const { isFetching, data, refetch } = useFeedCommunitiesGlobal();

  async function ptrRerefresh(done: Function) {
    if (refetch) {
      await refetch();
    }
    done();
  }

  return (
    <Page ptr onPtrRefresh={ptrRerefresh}>
      <FeedLayout
        feed={data}
        isFetching={isFetching}
        noteView={FeedViews.communities}
        refetch={refetch}
      />
    </Page>
  );
}

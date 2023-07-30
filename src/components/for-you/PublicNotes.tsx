import { useFeedCommunitiesGlobal } from "@/libs/ndk/hooks/useFeedCommunitiesGlobal";
// import { useFeedTags } from "@/libs/ndk/hooks/useFeedTags";
import { FeedViews } from "@/types/App";
import FeedLayout from "../app/layouts/feed";
import { Page } from "framework7-react";

export default function PublicNotes() {
  // todo switch to global communties when its more matured
  const { isFetching, data, refetch } = useFeedCommunitiesGlobal();
  // const { isFetching, data, status } = useFeedTags(["welcome"], "public");

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

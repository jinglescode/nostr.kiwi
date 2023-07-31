import { useTrendingNotes } from "@/libs/api.nostr.band/useTrendingNotes";
import FeedLayout from "../app/layouts/feed";
import { Page } from "framework7-react";

export default function HotNotes() {
  const { isFetching, data, refetch } = useTrendingNotes();

  async function ptrRerefresh(done: Function) {
    if (refetch) {
      await refetch();
    }
    done();
  }

  return (
    // <Page ptr onPtrRefresh={ptrRerefresh}>
    <>
      <FeedLayout feed={data} isFetching={isFetching} refetch={refetch} />
    </>
    // </Page>
  );
}

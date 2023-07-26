import { useTrendingNotes } from "@/libs/api.nostr.band/useTrendingNotes";
import FeedLayout from "../app/layouts/feed";

export default function HotNotes() {
  const { isFetching, data, refetch } = useTrendingNotes();
  return (
    <>
      <FeedLayout feed={data} isFetching={isFetching} refetch={refetch} />
    </>
  );
}

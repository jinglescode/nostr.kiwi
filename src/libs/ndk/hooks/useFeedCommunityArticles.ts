import { fetchArticles } from "@/libs/kiwi/nostr/fetchArticles";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { STALETIME } from "@/constants/nostr";

export function useFeedCommunityArticles(
  id: string | undefined,
  moderators: string[] | undefined
) {
  const { fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: id !== undefined && moderators !== undefined,
    queryKey: ["feed", id, "articles"],
    queryFn: async () => {
      let filter: NDKFilter = {
        kinds: [30023],
        "#a": [id!],
      };

      let notes = await fetchArticles({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
      });
      console.log(9999, "useFeedCommunityArticles", notes.length);

      return notes;
    },
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // cacheTime: 1000 * 60 * 60 * 24 * 2,
    staleTime: STALETIME.feed,
  });

  return { status, data, error, isFetching, refetch };
}

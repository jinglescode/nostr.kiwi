import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { STALETIME } from "@/constants/nostr";

export function useFeedAuthors(
  authors: string[] | undefined,
  queryKey: string | undefined
) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: authors !== undefined && queryKey !== undefined && !!ndk,
    queryKey: ["feed", queryKey],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [1],
        authors: authors,
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
        removeReplies: true,
      });
      console.log(9999, "useFeedAuthors", authors?.length, notes.length);

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

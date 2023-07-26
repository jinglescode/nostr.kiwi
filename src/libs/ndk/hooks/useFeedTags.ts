import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { STALETIME } from "@/constants/nostr";

export function useFeedTags(
  tags: string[] | undefined,
  queryKey: string | undefined,
  isRemoveSpam: boolean = true
) {
  const { fetchEventsEOSE } = useNDK();

  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: tags !== undefined,
    queryKey: ["feed", "tags", queryKey],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [1],
        "#t": tags!,
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
        removeReplies: true,
        removeManyTags: isRemoveSpam ? 3 : 0,
      });
      console.log(9999, "useFeedTags", queryKey, tags, notes.length);

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

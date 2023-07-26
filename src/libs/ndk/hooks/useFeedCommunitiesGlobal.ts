import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { STALETIME } from "@/constants/nostr";

export function useFeedCommunitiesGlobal() {
  const { fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: ["feed", "globalCommunities"],
    queryFn: async () => {
      let filter: NDKFilter = {
        //@ts-ignore
        kinds: [4550],
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
      });

      console.log(9999, "useFeedCommunitiesGlobal", notes.length);

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

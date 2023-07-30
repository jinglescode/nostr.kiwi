import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { STALETIME } from "@/constants/nostr";

export function useFeedCommunities({
  ids,
  queryKey,
  showAllNotes = false,
}: {
  ids: string[] | undefined;
  queryKey: string;
  showAllNotes?: boolean;
}) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching } = useQuery({
    enabled: ids !== undefined && !!ndk,
    queryKey: ["feed", queryKey, showAllNotes ? "all" : "mod"],
    queryFn: async () => {
      let filter: NDKFilter = {
        //@ts-ignore
        kinds: [4550],
        "#a": ids!,
      };

      if (showAllNotes) {
        filter = {
          kinds: [1],
          "#a": ids!,
        };
      }

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
      });

      console.log(9999, "useFeedCommunities", ids, notes.length);

      return notes;
    },
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // cacheTime: 1000 * 60 * 60 * 24 * 2,
    staleTime: STALETIME.feed,
  });

  return { status, data, error, isFetching };
}

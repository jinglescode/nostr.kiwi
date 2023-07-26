import { STALETIME } from "@/constants/nostr";
import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";
import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useUserActivities(pubkey: string | undefined) {
  const { fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "activities"],
    async () => {
      const filter: NDKFilter = {
        kinds: [1],
        "#p": [pubkey!],
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
      });
      console.log(9999, "useUserActivities", notes.length);

      notes = notes.filter((note) => note.author != pubkey);

      return notes;
    },
    {
      enabled: !!pubkey,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // cacheTime: 1000 * 60 * 60 * 24 * 7,
      staleTime: STALETIME.feed,
    }
  );

  return { status, data, error, isFetching, refetch };
}

import { useQuery } from "@tanstack/react-query";
import { useNDK } from "../ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";

export function useTrendingNotes() {
  const { fetchEvents } = useNDK();

  const { status, data, error, isFetching, refetch } = useQuery(
    ["trending", "notes"],
    async () => {
      const res = await fetch("https://api.nostr.band/v0/trending/notes");
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = (await res.json()) as { notes: { id: string }[] };

      const ids = data.notes.map((note) => note.id);

      const filter: NDKFilter = {
        kinds: [1],
        ids: ids,
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEvents,
        filter: filter,
        removeReplies: true,
      });

      return notes;
    },
    {
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 15,
    }
  );

  return { status, data, error, isFetching, refetch };
}

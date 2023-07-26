import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { STALETIME } from "@/constants/nostr";

export function useNote(eventId: string | undefined, removeReplies?: boolean) {
  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery({
    enabled: eventId !== undefined,
    queryKey: ["note", eventId],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [1],
        ids: [eventId!],
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEvents,
        filter: filter,
        removeReplies: removeReplies,
      });
      // console.log(9999, "notes", notes.length);

      return notes[0] || null;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    // cacheTime: 1000 * 60 * 60 * 24 * 2,
    staleTime: STALETIME.note,
  });

  return { status, data, error, isFetching };
}

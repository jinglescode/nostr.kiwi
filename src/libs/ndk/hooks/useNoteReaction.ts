import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { TReaction } from "@/types/Reaction";
import { STALETIME } from "@/constants/nostr";

// this gets the reactions for a note, not used
export function useNoteReaction(eventId: string | undefined) {
  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery({
    enabled: eventId !== undefined,
    queryKey: ["note", eventId, "reactions"],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [7],
        "#e": [eventId!],
      };

      const events = Array.from(await fetchEvents(filter));
      console.log(9999, "useNoteReaction", events.length);

      const reactions = events
        .map((e) => {
          return e.content;
        })
        .reduce(function (
          accumulator: { [reaction: string]: number },
          reaction
        ) {
          if (!(reaction in accumulator)) {
            accumulator[reaction] = 0;
          }
          accumulator[reaction] += 1;
          return accumulator;
        },
        {});

      const users = events
        .map((e) => {
          return [e.pubkey, e.content];
        })
        .reduce(function (
          accumulator: { [user: string]: { [reaction: string]: number } },
          userReaction
        ) {
          if (!(userReaction[0] in accumulator)) {
            accumulator[userReaction[0]] = {};
          }
          if (!(userReaction[1] in accumulator[userReaction[0]])) {
            accumulator[userReaction[0]][userReaction[1]] = 0;
          }
          accumulator[userReaction[0]][userReaction[1]] += 1;
          return accumulator;
        },
        {});

      const output: TReaction = {
        parentEventId: eventId!,
        reactions: reactions,
        users: users,
      };

      return output;
    },
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // cacheTime: 1000 * 60 * 60 * 24 * 2,
    staleTime: STALETIME.feed,
  });

  return { status, data, error, isFetching };
}

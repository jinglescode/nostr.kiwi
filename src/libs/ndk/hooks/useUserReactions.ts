import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { TUserReactions } from "@/types/User";
import { STALETIME } from "@/constants/nostr";

export function useUserReactions(npubOrPk: string | undefined) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery({
    enabled: npubOrPk !== undefined && !!ndk,
    queryKey: ["user", npubOrPk, "reactions"],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [7],
        authors: [npubOrPk!],
      };

      let userReactions: TUserReactions = {};

      const events = Array.from(await fetchEvents(filter));
      console.log(9999, "useUserReactions", events.length);

      events.forEach((e) => {
        const eTags = e.tags.filter((t) => t[0] === "e");
        if (eTags.length == 1) {
          const _eventId = eTags[0][1];
          if (!(_eventId in userReactions)) {
            userReactions[_eventId] = [];
          }
          userReactions[_eventId].push(e.content);
        }
      });

      return userReactions;
    },
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // cacheTime: 1000 * 60 * 60 * 24 * 2,
    staleTime: STALETIME.feed,
  });

  return { status, data, error, isFetching };
}

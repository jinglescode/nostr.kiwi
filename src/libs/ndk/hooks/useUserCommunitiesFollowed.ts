import { STALETIME } from "@/constants/nostr";
import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useUserCommunitiesFollowed(pubkey: string | undefined) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "communities", "followed"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30001],
        "#d": ["communities"],
        authors: [pubkey!],
      };
      let events = Array.from(await fetchEvents(filter));
      console.log(9999, "useUserCommunitiesFollowed", events.length);

      let ids = [];
      for (let e of events) {
        for (let tag of e.tags) {
          if (tag[0] === "e" || tag[0] === "a") {
            ids.push(tag[1]);
          }
        }
      }

      return ids;
    },
    {
      enabled: !!pubkey && !!ndk,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // cacheTime: 1000 * 60 * 60 * 24 * 7,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching, refetch };
}

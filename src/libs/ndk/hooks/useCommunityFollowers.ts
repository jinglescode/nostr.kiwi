import { STALETIME } from "@/constants/nostr";
import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useCommunityFollowers(id: string | undefined) {
  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["communities", id, "followers"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30001],
        "#a": [id!],
      };

      let events = Array.from(await fetchEvents(filter));
      // console.log(9999, "useCommunityFollowers", events.length);

      const pubkeys = events.map((e) => {
        return e.pubkey;
      });
      return pubkeys;
    },
    {
      enabled: !!id,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching, refetch };
}

import { STALETIME } from "@/constants/nostr";
import eventToCommunity from "@/libs/kiwi/nostr/eventToCommunities";
import { useNDK } from "@/libs/ndk";
import { TCommunity } from "@/types/Community";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserCommunitiesModerator(pubkey: string | undefined) {
  const queryClient = useQueryClient();

  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "communities", "moderator"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [34550],
        "#p": [pubkey!],
      };
      const events = await fetchEvents(filter);
      console.log(9999, "useUserCommunitiesModerator", events.length);

      const communities = events.map((event) => {
        return eventToCommunity(event);
      });
      return communities;
    },
    {
      enabled: !!pubkey,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // cacheTime: 1000 * 60 * 60 * 24 * 7,
      staleTime: STALETIME.info,
      initialData: () => {
        const communities = queryClient.getQueryData([
          "communities",
        ]) as TCommunity[];
        if (communities) {
          return communities.filter((c) => c.moderators.includes(pubkey!));
        } else {
          return undefined;
        }
      },
    }
  );

  return { status, data, error, isFetching, refetch };
}

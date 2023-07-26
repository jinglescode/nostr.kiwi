import { STALETIME } from "@/constants/nostr";
import eventToCommunity from "@/libs/kiwi/nostr/eventToCommunities";
import { useNDK } from "@/libs/ndk";
import { TCommunity } from "@/types/Community";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useCommunity(id: string | undefined) {
  const queryClient = useQueryClient();
  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["communities", id],
    async () => {
      const [_, author, d] = id!.split(":");

      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [34550],
        authors: [author],
        "#d": [d],
      };
      const events = await fetchEvents(filter);
      console.log(9999, "useCommunity", events.length);

      if (events.length === 0) throw new Error("Community not found");

      const community = eventToCommunity(events[0]);
      return community;
    },
    {
      enabled: !!id,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // cacheTime: 1000 * 60 * 60 * 24 * 7,
      staleTime: STALETIME.info,
      initialData: () => {
        const communities = queryClient.getQueryData([
          "communities",
        ]) as TCommunity[];
        const community = communities?.find((c) => c.id === id);
        return community;
      },
    }
  );

  return { status, data, error, isFetching };
}

import { STALETIME } from "@/constants/nostr";
import eventToCommunity from "@/libs/kiwi/nostr/eventToCommunities";
import { useNDK } from "@/libs/ndk";
import { TCommunity } from "@/types/Community";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useCommunities() {
  const queryClient = useQueryClient();

  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["communities"],
    async () => {
      let existingCommunities: TCommunity[] = [];

      const _existingCommunities = queryClient.getQueryData([
        "communities",
      ]) as TCommunity[];

      if (_existingCommunities) {
        existingCommunities = _existingCommunities;
      }

      const existingCommuntiesIds = existingCommunities.map((community) => {
        return community.id;
      });

      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [34550],
      };
      const events = await fetchEventsEOSE(filter);
      const newCommunities = events
        .map((event) => {
          return eventToCommunity(event);
        })
        .filter((community) => {
          return !existingCommuntiesIds.includes(community.id);
        });

      const communities = existingCommunities.concat(newCommunities);

      console.log(
        9999,
        "useCommunities",
        events.length,
        newCommunities.length,
        existingCommunities.length,
        communities.length
      );

      return communities;
    },
    {
      enabled: !!ndk,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching, refetch };
}

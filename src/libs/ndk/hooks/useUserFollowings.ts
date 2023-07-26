import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { getPublicKeys } from "../utils/getPublicKeys";
import { STALETIME } from "@/constants/nostr";

export function useUserFollowings(npubOrPk: string | undefined) {
  let pubkey = npubOrPk;

  if (npubOrPk && npubOrPk.includes("npub"))
    pubkey = getPublicKeys(npubOrPk).pk;

  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "followings"],
    async () => {
      const filter: NDKFilter = { kinds: [3], authors: [pubkey!] };
      const events = await fetchEvents(filter);

      const event = [...events].slice(-1)[0];

      const pubkeys = event.tags.filter((t) => t[0] === "p").map((t) => t[1]);
      return pubkeys;
    },
    {
      enabled: !!pubkey,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // cacheTime: 1000 * 60 * 60 * 24 * 7,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching, refetch };
}

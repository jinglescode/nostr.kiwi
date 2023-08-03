import { STALETIME } from "@/constants/nostr";
import eventToListUser from "@/libs/kiwi/nostr/eventToListUser";
import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useUserList(
  pubkey: string | undefined,
  id: string | undefined,
  kind: number | undefined
) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["user", pubkey, "lists", id],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [kind],
        authors: [pubkey!],
        "#d": [id!],
      };

      let events = Array.from(await fetchEventsEOSE(filter));
      console.log(9999, "useUserList", events.length, events);

      if (events.length === 0) return undefined;

      const list = eventToListUser(events);
      return list[id!];
    },
    {
      enabled: !!pubkey && !!ndk && !!id && !!kind,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching };
}

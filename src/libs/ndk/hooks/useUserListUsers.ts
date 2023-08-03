import { STALETIME } from "@/constants/nostr";
import eventToListUser from "@/libs/kiwi/nostr/eventToListUser";
import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useUserListUsers(pubkey: string | undefined) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["user", pubkey, "lists"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30000],
        authors: [pubkey!],
      };
      let events = Array.from(await fetchEvents(filter));
      console.log(9999, "useUserLists", events.length, events);

      const list = eventToListUser(events);

      return list;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching };
}

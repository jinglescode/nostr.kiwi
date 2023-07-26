import { STALETIME } from "@/constants/nostr";
import { useNDK } from "@/libs/ndk";
import { TUserList } from "@/types/List";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useUserListUsers(pubkey: string | undefined) {
  const { fetchEvents } = useNDK();
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

      let _lists: { [id: string]: TUserList } = {};
      for (let e of events) {
        const dTags = e.tags.filter((t) => t[0] === "d");
        const pTags = e.tags.filter((t) => t[0] === "p").map((t) => t[1]);

        if (dTags.length === 0 || dTags.length > 1 || pTags.length === 0)
          continue;

        const id = dTags[0][1];
        if (id != "mute") {
          _lists[id] = { id, items: pTags, type: "user" };
        }
      }

      return _lists;
    },
    {
      enabled: !!pubkey,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching };
}

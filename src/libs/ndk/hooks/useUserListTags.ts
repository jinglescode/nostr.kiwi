import { STALETIME } from "@/constants/nostr";
import { useNDK } from "@/libs/ndk";
import { TTagList } from "@/types/List";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useUserListTags(pubkey: string | undefined) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["user", pubkey, "tags"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30001],
        authors: [pubkey!],
      };
      let events = Array.from(await fetchEvents(filter));
      console.log(9999, "useUserListTags", events.length, events);

      let _lists: { [id: string]: TTagList } = {};
      for (let e of events) {
        const dTags = e.tags.filter((t) => t[0] === "d");
        const tTags = e.tags.filter((t) => t[0] === "t").map((t) => t[1]);

        if (dTags.length === 0 || dTags.length > 1 || tTags.length === 0)
          continue;

        const id = dTags[0][1];
        _lists[id] = { id, items: tTags, type: "tag" };
      }

      return _lists;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: STALETIME.info,
    }
  );

  return { status, data, error, isFetching };
}

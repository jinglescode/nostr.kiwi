import { STALETIME } from "@/constants/nostr";
import { useNDK } from "@/libs/ndk";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

export function useUserTopics(pubkey: string | undefined) {
  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["user", pubkey, "topics"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30001],
        "#d": ["hashtags"],
        authors: [pubkey!],
      };
      let events = Array.from(await fetchEvents(filter));
      console.log(9999, "useUserTopics", events.length);

      let _tags = [];
      for (let e of events) {
        for (let tag of e.tags) {
          if (tag[0] === "t") {
            _tags.push(tag[1]);
          }
        }
      }

      return _tags;
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

  return { status, data, error, isFetching };
}

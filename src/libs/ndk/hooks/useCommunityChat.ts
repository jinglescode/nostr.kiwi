import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { TMessage } from "@/types/Message";

export function useCommunityChat(id: string | undefined) {
  const { fetchEvents } = useNDK();

  const { status, data, error, isFetching } = useQuery({
    enabled: id !== undefined,
    queryKey: ["chat", id],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [42],
        "#a": [id!],
      };

      const events = Array.from(await fetchEvents(filter));
      console.log(9999, "useCommunityChat", events.length);

      const messages = events
        .map((e) => {
          const message: TMessage = {
            id: e.id,
            content: e.content,
            author: e.pubkey,
            created_at: e.created_at!,
          };
          return message;
        })
        .sort((a, b) => {
          if (b.created_at && a.created_at) {
            return a.created_at - b.created_at;
          } else {
            return -1;
          }
        });

      return messages;
    },
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // cacheTime: 1000 * 60 * 60 * 24 * 3,
  });

  return { status, data, error, isFetching };
}

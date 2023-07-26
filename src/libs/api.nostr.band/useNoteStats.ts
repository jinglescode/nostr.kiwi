import { TNoteStats } from "@/types/Note";
import { useQuery } from "@tanstack/react-query";

export function useNoteStats(eventId: string) {
  const { status, data, error, isFetching } = useQuery(
    ["note", eventId, "stats"],
    async () => {
      const res = await fetch(
        `https://api.nostr.band/v0/stats/event/${eventId}`
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();

      const dataJson = data.stats[eventId];

      if (dataJson) {
        const stats: TNoteStats = {
          react: dataJson.reaction_count ? dataJson.reaction_count : 0,
          repost: dataJson.repost_count ? dataJson.repost_count : 0,
          reply: dataJson.reply_count ? dataJson.reply_count : 0,
          zaps: dataJson.zaps
            ? dataJson.zaps.count
              ? dataJson.zaps.count
              : 0
            : 0,
          zapsAmt: dataJson.zaps
            ? dataJson.zaps.msats
              ? dataJson.zaps.msats / 1000
              : 0
            : 0,
        };
        return stats;
      }

      return undefined;
    },
    {
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 15,
    }
  );

  return { status, data, error, isFetching };
}

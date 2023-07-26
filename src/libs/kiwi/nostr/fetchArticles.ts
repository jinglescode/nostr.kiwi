import { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk";
import eventToArticle from "./eventToArticle";

export async function fetchArticles({
  fetchEvents,
  filter,
}: {
  fetchEvents: (filter: NDKFilter) => Promise<NDKEvent[]>;
  filter: NDKFilter;
  removeReplies?: boolean;
  removeManyTags?: number;
}) {
  let events = await fetchEvents(filter);

  const notes = events
    .map((event) => {
      return eventToArticle(event);
    })
    .sort((a, b) => {
      if (b.created_at && a.created_at) {
        return b.created_at - a.created_at;
      } else {
        return -1;
      }
    });

  return notes;
}

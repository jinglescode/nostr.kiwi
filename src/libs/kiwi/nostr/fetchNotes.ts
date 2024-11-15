import { FEED_LIMIT } from "@/constants/nostr";
import eventToNote from "@/libs/kiwi/nostr/eventToNote";
import { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk";

export async function fetchNotes({
  fetchEvents,
  filter,
  removeReplies = false,
  removeManyTags = 0,
}: {
  fetchEvents: (filter: NDKFilter) => Promise<NDKEvent[]>;
  filter: NDKFilter;
  removeReplies?: boolean;
  removeManyTags?: number;
}) {
  let events = await fetchEvents(filter);

  if (removeReplies) {
    events = events.filter((event) => {
      return event.tags.filter((t) => t[0] === "e").length === 0;
    });
  }

  if (removeManyTags > 0) {
    events = events.filter((note) => {
      const tTags = note.tags.filter((t) => t[0] === "t");
      if (tTags.length > removeManyTags) {
        return false;
      }
      return true;
    });
  }

  const notes = events
    .map((event) => {
      return eventToNote(event);
    })
    .sort((a, b) => {
      if (b.created_at && a.created_at) {
        return b.created_at - a.created_at;
      } else {
        return -1;
      }
    })
    .slice(0, FEED_LIMIT);

  return notes;
}

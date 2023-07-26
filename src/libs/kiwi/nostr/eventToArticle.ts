import { TArticle } from "@/types/Article";
import { NDKEvent } from "@nostr-dev-kit/ndk";

export default function eventToArticle(event: NDKEvent) {
  let created_at: number | string = getTags(event, "published_at")[0];
  if (created_at) {
    created_at = parseInt(created_at);
  } else if (event.created_at) {
    created_at = event.created_at;
  }

  const article: TArticle = {
    id: event.id,
    content: event.content,
    author: event.pubkey,
    tags: event.tags,
    topicTags: getTags(event, "t"),
    image: getTags(event, "image")[0],
    title: getTags(event, "title")[0],
    summary: getTags(event, "summary")[0],
    created_at: created_at as number,
    // event: event,
    kind: 30023,
  };

  return article;
}

function getTags(event: NDKEvent, key: string) {
  return event.tags.filter((t) => t[0] === key).map((t) => t[1]);
}

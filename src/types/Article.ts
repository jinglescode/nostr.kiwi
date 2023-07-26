import { NDKEvent, NDKTag } from "@nostr-dev-kit/ndk";

export type TArticle = {
  id: string;
  content: string;
  author: string;
  tags: NDKTag[];
  topicTags: string[];
  image?: string;
  title?: string;
  summary?: string;
  created_at?: number;
  kind: number;
};

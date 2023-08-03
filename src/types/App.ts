import { NDKTag } from "@nostr-dev-kit/ndk";
import { TArticle } from "./Article";
import { TCommunity } from "./Community";
import { TNote } from "./Note";
import { TTagList, TUserList } from "./List";

export type TAppDialog = {
  reaction?: {
    note: TNote;
  };
  zap?: {
    note: TNote;
  };
  repostNoteToCommunity?: {
    noteId: string;
  };
  nwcUrl?: string;
  webLnUrl?: string;
  customNwc?: boolean;
  userAddToList?: string;
  tag?: string;
  tagAddToList?: string;
  listUserFork?: TUserList;
  newListAddUsers?: string[];
};

export type TPopup = {
  note?: TNote;
  composeNote?: {
    show: boolean;
    replyNote?: TNote;
    community?: TCommunity;
  };
  composeCommunity?: {
    show: boolean;
    community?: TCommunity;
  };
  community?: TCommunity;
  article?: TArticle;
  settings?: boolean;
  userList?: TUserList;
  tagList?: string;
  listFeed?: TUserList | TTagList;
};

export type TActionSheet = {
  pkOrNpub?: string;
  note?: TNote;
  url?: string;
  repost?: TNote;
  communities?: boolean;
  communityId?: string;
  foryou?: boolean;
  user?: boolean;
  listUsers?: TUserList;
  tag?: string;
  listTags?: string;
};

export type TSheetModal = {
  communityChat?: { community: TCommunity };
};

export type TNoteEditorMetadata = {
  replyNote?: { id: string; authorPk: string; tags: NDKTag[] };
  community?: { id: string; name: string };
  quoteNote?: { id: string; authorPk: string };
  communityChat?: { community: TCommunity };
};

export enum TabViews {
  foryou,
  communities,
  search,
  list,
  user,
}

export enum UsersViews {
  feed,
  lists,
  communities,
  info,
}

export enum ForYouViews {
  followedUsers,
  followedCommunties,
  hot,
  globalCommunties,
  userList,
}

export enum FeedViews {
  users,
  communities,
}

export type TUserPanel = {
  npubOrPk?: string;
};

export type TNotePanel = {
  note?: TNote;
};

export type TCommunityPanel = {
  page?: { communityId: string | undefined };
  info?: { communityId: string | undefined };
};

export enum EThemes {
  ios,
  material,
}

export type TListPanel = {
  page?: { id: string | undefined; type: "user" | "tag" };
  info?: { id: string | undefined };
};

export type TTagPanel = {
  page?: { id: string | undefined };
};

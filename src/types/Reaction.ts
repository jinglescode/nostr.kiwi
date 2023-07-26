export type TReaction = {
  parentEventId: string;
  reactions: { [reaction: string]: number };
  users: { [user: string]: { [reaction: string]: number } };
};

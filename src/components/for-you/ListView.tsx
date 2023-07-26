import { useUserListTags } from "@/libs/ndk/hooks/useUserListTags";
import { useUserListUsers } from "@/libs/ndk/hooks/useUserListUsers";
import { usePersistUIStore } from "@/libs/zustand/persistUIStore";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { TTagList, TUserList } from "@/types/List";
import ListFeed from "../list/ListFeed";

export default function ListView() {
  const user = usePersistUserStore((state) => state.user);
  const viewForYou = usePersistUIStore((state) => state.viewForYou);

  let id: undefined | string = undefined;
  let type: undefined | string = undefined;

  if (typeof viewForYou == "string" && viewForYou.includes("list::")) {
    const [_, _type, _id] = viewForYou.split("::");
    id = _id;
    type = _type;
  }

  let lists: {
    [id: string]: TUserList | TTagList;
  } = {};
  const { data: listUsers } = useUserListUsers(
    type == "user" ? user?.pk : undefined
  );
  const { data: listTags } = useUserListTags(
    type == "tag" ? user?.pk : undefined
  );
  if (listUsers !== undefined) lists = { ...lists, ...listUsers };
  if (listTags !== undefined) lists = { ...lists, ...listTags };

  const list = id ? lists?.[id] : undefined;

  if (list === undefined) return <></>;

  return (
    <>
      <ListFeed list={list} />
    </>
  );
}

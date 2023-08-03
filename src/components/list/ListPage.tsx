import { useUserListTags } from "@/libs/ndk/hooks/useUserListTags";
import { useUserListUsers } from "@/libs/ndk/hooks/useUserListUsers";
import { TTagList, TUserList } from "@/types/List";
import { Icon, List, ListItem, f7 } from "framework7-react";
import UserName from "../user/UserName";

const LIMIT = 2;

export default function ListsPage({ pk }: { pk: string }) {
  let lists: {
    [id: string]: TUserList | TTagList;
  } = {};
  const { data: listUsers } = useUserListUsers(pk);
  // const { data: listTags } = useUserListTags(pk);
  if (listUsers) lists = { ...lists, ...listUsers };
  // if (listTags) lists = { ...lists, ...listTags };

  return (
    <>
      <List menuList mediaList outlineIos strongIos>
        {lists &&
          Object.keys(lists).map((listName) => {
            const list = lists[listName];
            return (
              <ListItem
                title={list.id}
                link={`/list/${list.id}/${list.pk}:${
                  list.type == "user" ? "30000" : "30001"
                }`}
              >
                {list.type == "user" ? (
                  <Icon md="material:person" ios="f7:person" slot="media" />
                ) : (
                  <Icon md="material:tag" ios="f7:number" slot="media" />
                )}

                <span slot="subtitle">{<Subtitle list={list} />}</span>
              </ListItem>
            );
          })}
      </List>
    </>
  );
}

function Subtitle({ list }: { list: TUserList | TTagList }) {
  let limit = LIMIT;

  let output: React.ReactNode[] = [];

  for (let i = 0; i < list.items.length; i++) {
    if (i <= limit) {
      if (i > 0) output.push(", ");
      if (list.type == "user") {
        output.push(<UserName pk={list.items[i]} />);
      } else {
        output.push(<>{`#${list.items[i]}`}</>);
      }
      limit--;
    }
  }

  if (limit == 0 && list.items.length > LIMIT)
    output.push(` and ${list.items.length - LIMIT} others...`);

  return output;
}

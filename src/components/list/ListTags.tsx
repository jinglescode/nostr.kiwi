import { useUserListTags } from "@/libs/ndk/hooks/useUserListTags";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { Block, Button } from "framework7-react";
import { useUserListTagsPost } from "@/libs/ndk/hooks/useUserListTagsPost";
import { useEffect } from "react";
import { useSessionStore } from "@/libs/zustand/session";

export default function ListTags({ id }: { id: string }) {
  const user = usePersistUserStore((state) => state.user);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const { data: lists } = useUserListTags(user?.pk);
  const { mutate, isSuccess, isError } = useUserListTagsPost();

  const list = lists?.[id];

  useEffect(() => {
    if (isSuccess) {
      setToastMessage("Tag removed from list");
    }
    if (isError) {
      setToastMessage("Failed to remove tag from list");
    }
  }, [isSuccess, isError]);

  if (list === undefined) return <></>;

  async function removeTagFromList(user: string) {
    if (list === undefined) return;

    var index = list.items.indexOf(user);
    if (index !== -1) {
      list.items.splice(index, 1);
    }

    await mutate(list);
  }

  return (
    <Block inset>
      {list.items.map((item, i) => {
        return (
          <div
            className="relative flex items-center space-x-4 mb-4 h-10"
            key={i}
          >
            <div className="overflow-hidden">{item}</div>
            <div className="min-w-0 flex-1"></div>
            <div className="w-16">
              <Button small={true} onClick={() => removeTagFromList(item)}>
                remove
              </Button>
            </div>
          </div>
        );
      })}
    </Block>
  );
}

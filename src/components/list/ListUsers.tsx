import UserHeader from "../user/UserHeader";
import { Block, Button } from "framework7-react";
import { useUserListUsersPost } from "@/libs/ndk/hooks/useUserListUsersPost";
import { useEffect } from "react";
import { useSessionStore } from "@/libs/zustand/session";
import { TUserList } from "@/types/List";
import { useNDK } from "@/libs/ndk";

export default function ListUsers({ list }: { list: TUserList }) {
  const { signer } = useNDK();

  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const { mutate, isSuccess, isError } = useUserListUsersPost();

  useEffect(() => {
    if (isSuccess) {
      setToastMessage("User removed from list");
    }
    if (isError) {
      setToastMessage("Failed to remove user from list");
    }
  }, [isSuccess, isError]);

  if (list === undefined) return <></>;

  async function removeUserFromList(user: string) {
    if (list === undefined) return;

    var index = list.items.indexOf(user);
    if (index !== -1) {
      list.items.splice(index, 1);
    }

    await mutate(list);
  }

  return (
    <Block inset>
      {list.items.map((item) => {
        return (
          <UserHeader
            pk={item}
            key={item}
            rightOptions={
              signer && (
                <div className="w-16">
                  <Button small={true} onClick={() => removeUserFromList(item)}>
                    remove
                  </Button>
                </div>
              )
            }
          />
        );
      })}
    </Block>
  );
}

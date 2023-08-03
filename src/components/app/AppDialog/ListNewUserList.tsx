import { useUserListUsersPost } from "@/libs/ndk/hooks/useUserListUsersPost";
import { useUserListUsers } from "@/libs/ndk/hooks/useUserListUsers";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TUserList } from "@/types/List";
import { f7 } from "framework7-react";

import { useEffect, useState } from "react";

export default function ListNewUserListDialog() {
  const user = usePersistUserStore((state) => state.user);

  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const { mutate, isSuccess, isError } = useUserListUsersPost();

  const [loading, setLoading] = useState(false);

  const newListAddUsers = appDialog?.newListAddUsers;

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setToastMessage("Users added to list");
      setAppDialog({ userAddToList: undefined });
    }
    if (isError) {
      setLoading(false);
      setToastMessage("Failed to add users to list");
      setAppDialog({ userAddToList: undefined });
    }
  }, [isSuccess, isError]);

  async function addToList(listName: string) {
    if (newListAddUsers === undefined || user === undefined) return;

    setLoading(true);

    let thisList: TUserList = {
      id: listName,
      items: newListAddUsers,
      type: "user",
      pk: user.pk,
    };

    await mutate(thisList);
  }

  useEffect(() => {
    if (newListAddUsers) {
      f7.dialog.prompt(
        "Give a name for this new list.",
        "Create a New List",
        (listName) => {
          addToList(listName);
        },
        () => {
        },
        ""
      );
    }
  }, [newListAddUsers]);

  return <></>;
}

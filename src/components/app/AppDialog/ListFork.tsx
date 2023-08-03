import { useUserListUsersPost } from "@/libs/ndk/hooks/useUserListUsersPost";
import { useUserListUsers } from "@/libs/ndk/hooks/useUserListUsers";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TUserList } from "@/types/List";
import { f7 } from "framework7-react";

import { useEffect, useState } from "react";

export default function ListForkDialog() {
  const user = usePersistUserStore((state) => state.user);

  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const { mutate, isSuccess, isError } = useUserListUsersPost();

  const [selectedList, setSelectedList] = useState("");
  const [inputNewList, setInputNewList] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: userlists } = useUserListUsers(user?.pk);

  const listUserFork = appDialog?.listUserFork;

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setToastMessage("Users added to list");
      setSelectedList("");
      setInputNewList("");
      setAppDialog({ userAddToList: undefined });
    }
    if (isError) {
      setLoading(false);
      setToastMessage("Failed to add users to list");
      setAppDialog({ userAddToList: undefined });
    }
  }, [isSuccess, isError]);

  function selectList(selectedList: string) {
    setSelectedList(selectedList);
  }

  function typeNewList(value: string) {
    setSelectedList("");
    setInputNewList(value);
  }

  async function addToList(selectedList: string) {
    if (listUserFork === undefined || user === undefined) return;

    setLoading(true);

    let thisList: TUserList = {
      id: "",
      items: listUserFork.items,
      type: "user",
      pk: user.pk,
    };

    if (selectedList.length > 0) {
      if (userlists === undefined) return;
      const _existingList = userlists[selectedList];
      if (_existingList === undefined) return;
      thisList.id = _existingList.id;
      thisList.items = [...thisList.items, ..._existingList.items];
    }

    await mutate(thisList);
  }

  useEffect(() => {
    if (listUserFork && userlists) {
      const dialog = f7.dialog.create({
        title: "Add to existing List",
        buttons: [
          ...Object.keys(userlists).map((id, i) => ({
            text: id,
            onClick: () => {
              addToList(id);
            },
          })),
          {
            text: "New List",
            onClick: () => {
              setAppDialog({
                userAddToList: undefined,
                newListAddUsers: listUserFork.items,
              });
              dialog.close();
            },
          },
          {
            text: "Cancel",
            onClick: () => {
              setAppDialog({ userAddToList: undefined });
              dialog.close();
            },
          },
        ],

        verticalButtons: true,
      });

      dialog.open();
    }
  }, [listUserFork]);

  return <></>;
}

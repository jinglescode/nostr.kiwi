import { useUserListUsersPost } from "@/libs/ndk/hooks/useUserListUsersPost";
import { useUserListUsers } from "@/libs/ndk/hooks/useUserListUsers";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TUserList } from "@/types/List";
import { f7 } from "framework7-react";

import { useEffect, useState } from "react";

export default function UserAddToListDialog() {
  const user = usePersistUserStore((state) => state.user);

  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const { mutate, isSuccess, isError } = useUserListUsersPost();

  const [selectedList, setSelectedList] = useState("");
  const [inputNewList, setInputNewList] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: userlists } = useUserListUsers(user?.pk);

  const userAddToList = appDialog?.userAddToList;

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setToastMessage("User added to list");
      setSelectedList("");
      setInputNewList("");
      setAppDialog({ userAddToList: undefined });
    }
    if (isError) {
      setLoading(false);
      setToastMessage("Failed to add user to list");
    }
  }, [isSuccess, isError]);

  function selectList(selectedList: string) {
    setSelectedList(selectedList);
  }

  function typeNewList(value: string) {
    setSelectedList("");
    setInputNewList(value);
  }

  async function addUserToList(selectedList: string) {
    if (appDialog?.userAddToList === undefined) return;

    setLoading(true);

    let thisList: TUserList = {
      id: inputNewList,
      items: [appDialog.userAddToList],
      type: "user",
    };

    if (selectedList.length > 0) {
      if (userlists === undefined) return;
      thisList = userlists[selectedList];
      if (thisList === undefined) return;
      thisList.items.push(appDialog.userAddToList);
    }

    await mutate(thisList);
  }

  useEffect(() => {
    if (userAddToList && userlists) {
      f7.dialog
        .create({
          title: "Add user to List",
          buttons: Object.keys(userlists).map((id, i) => ({
            text: id,
            onClick: () => {
              addUserToList(id);
            },
          })),
          verticalButtons: true,
        })
        .open();
    }
  }, [userAddToList]);

  return <></>;
  // return (
  //   <Dialog
  //     opened={userAddToList !== undefined}
  //     onBackdropClick={() => setAppDialog({ userAddToList: undefined })}
  //     title="Add user to list"
  //     //@ts-ignore
  //     content={
  //       <List nested className="-mx-4">
  //         {userlists &&
  //           Object.keys(userlists).map((id, i) => (
  //             <ListItem
  //               key={i}
  //               label
  //               title={id}
  //               after={
  //                 <Radio
  //                   component="div"
  //                   value={id}
  //                   checked={selectedList === id}
  //                   onChange={() => selectList(id)}
  //                 />
  //               }
  //             />
  //           ))}
  //         <ListInput
  //           label="Create a new list"
  //           placeholder="e.g. content creators"
  //           value={inputNewList}
  //           //@ts-ignore
  //           onChange={(e) => typeNewList(e.target.value)}
  //         />
  //       </List>
  //     }
  //     buttons={
  //       <DialogButton
  //         onClick={() => addUserToList()}
  //         disabled={
  //           loading || (selectedList == "" && inputNewList.length === 0)
  //         }
  //       >
  //         {loading ? (
  //           <Preloader />
  //         ) : (
  //           <>
  //             {selectedList == "" && inputNewList.length > 0 ? (
  //               <>Add to {inputNewList}</>
  //             ) : (
  //               <>Add to {selectedList}</>
  //             )}
  //           </>
  //         )}
  //       </DialogButton>
  //     }
  //   />
  // );
}

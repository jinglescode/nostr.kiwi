import { useUserListTagsPost } from "@/libs/ndk/hooks/useUserListTagsPost";
import { useUserListTags } from "@/libs/ndk/hooks/useUserListTags";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TTagList } from "@/types/List";
import { f7 } from "framework7-react";

import { useEffect, useState } from "react";

export default function TagAddToListDialog() {
  const user = usePersistUserStore((state) => state.user);

  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const { mutate, isSuccess, isError } = useUserListTagsPost();

  const [selectedList, setSelectedList] = useState("");
  const [inputNewList, setInputNewList] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: userlists } = useUserListTags(user?.pk);

  const tagAddToList = appDialog?.tagAddToList;

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setToastMessage("Tag added to list");
      setSelectedList("");
      setInputNewList("");
      setAppDialog({ tag: undefined });
    }
    if (isError) {
      setLoading(false);
      setToastMessage("Failed to add tag to list");
    }
  }, [isSuccess, isError]);

  function selectList(selectedList: string) {
    setSelectedList(selectedList);
  }

  function typeNewList(value: string) {
    setSelectedList("");
    setInputNewList(value);
  }

  async function addTagToList(selectedList: string) {
    if (appDialog?.tagAddToList === undefined || user === undefined) return;

    setLoading(true);

    let thisList: TTagList = {
      id: inputNewList,
      items: [appDialog.tagAddToList],
      type: "tag",
      pk: user.pk,
    };

    if (selectedList.length > 0) {
      if (userlists === undefined) return;
      thisList = userlists[selectedList];
      if (thisList === undefined) return;
      thisList.items.push(appDialog.tagAddToList);
    }

    await mutate(thisList);
  }

  useEffect(() => {
    if (tagAddToList && userlists) {
      f7.dialog
        .create({
          title: `Add #${tagAddToList} to List`,
          buttons: Object.keys(userlists).map((id, i) => ({
            text: id,
            onClick: () => {
              addTagToList(id);
            },
          })),
          verticalButtons: true,
        })
        .open();
    }
  }, [tagAddToList]);

  return <></>;

  // return (
  //   <Dialog
  //     opened={tagAddToList !== undefined}
  //     onBackdropClick={() => setAppDialog({ tagAddToList: undefined })}
  //     title={`Add #${tagAddToList} to list`}
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
  //           placeholder="e.g. All sorts of Art"
  //           value={inputNewList}
  //           //@ts-ignore
  //           onChange={(e) => typeNewList(e.target.value)}
  //         />
  //       </List>
  //     }
  //     buttons={
  //       <DialogButton
  //         onClick={() => addTagToList()}
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

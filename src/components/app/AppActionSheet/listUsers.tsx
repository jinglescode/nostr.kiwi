import { useNDK } from "@/libs/ndk";
import { useSessionStore } from "@/libs/zustand/session";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsListUsers() {
  const { signer } = useNDK();

  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

  const listUsers = appActionSheet?.listUsers;

  return (
    <>
      {listUsers && (
        <ActionsGroup>
          <ActionsLabel>User List</ActionsLabel>
          <ActionsButton
            onClick={() => {
              setAppPopup({ userList: listUsers });
              setAppActionSheet(undefined);
            }}
          >
            List Info
          </ActionsButton>
          {signer && (
            <ActionsButton
              onClick={() => {
                console.log('setAppDialog', listUsers)
                setAppDialog({ listUserFork: listUsers });
                setAppActionSheet(undefined);
              }}
            >
              Fork this List
            </ActionsButton>
          )}
        </ActionsGroup>
      )}
    </>
  );
}

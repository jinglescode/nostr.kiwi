import { useSessionStore } from "@/libs/zustand/session";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsListUsers() {
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);
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
        </ActionsGroup>
      )}
    </>
  );
}

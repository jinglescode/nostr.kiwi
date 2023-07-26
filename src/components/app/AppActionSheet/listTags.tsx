import { useSessionStore } from "@/libs/zustand/session";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsListTags() {
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const listTags = appActionSheet?.listTags;

  return (
    <>
      {listTags && (
        <ActionsGroup>
          <ActionsLabel>Tags List</ActionsLabel>
          <ActionsButton
            onClick={() => {
              setAppPopup({ tagList: listTags });
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

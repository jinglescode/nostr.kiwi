import { useSessionStore } from "@/libs/zustand/session";
import { sessionTagStore } from "@/libs/zustand/sessionTagStore";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsTag() {
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const tag = appActionSheet?.tag;

  return (
    <>
      {appActionSheet && tag && (
        <ActionsGroup>
          <ActionsLabel>#{tag}</ActionsLabel>
          <ActionsButton
            onClick={() => {
              setAppDialog({ tagAddToList: tag });
              setAppActionSheet(undefined);
            }}
          >
            Add Tag to List
          </ActionsButton>
          <ActionsButton
            onClick={() => {
              setAppPopup({ listFeed: {
                id: tag,
                items: [tag],
                type: 'tag',
              }});
              setAppActionSheet(undefined);
            }}
          >
            Browse Feed on #{tag}
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

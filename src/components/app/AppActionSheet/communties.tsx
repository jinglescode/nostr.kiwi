import { useCommunities } from "@/libs/ndk/hooks/useCommunities";
import { useSessionStore } from "@/libs/zustand/session";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsCommunities() {
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const communities = appActionSheet?.communities;

  const { refetch } = useCommunities();

  return (
    <>
      {appActionSheet && communities && (
        <ActionsGroup>
          <ActionsLabel>Communities</ActionsLabel>
          <ActionsButton
            onClick={() => {
              setAppPopup({ composeCommunity: { show: true } });
              setAppActionSheet(undefined);
            }}
          >
            Create New Community
          </ActionsButton>
          <ActionsButton
            onClick={() => {
              refetch();
              setAppActionSheet(undefined);
            }}
          >
            Refetch Communities List
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

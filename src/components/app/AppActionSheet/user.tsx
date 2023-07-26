import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { usePersistUIStore } from "@/libs/zustand/persistUIStore";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { useQueryClient } from "@tanstack/react-query";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsUser() {
  const queryClient = useQueryClient();

  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const user = appActionSheet?.user;

  const unsetUser = usePersistUserStore((state) => state.unsetUser);

  function logout() {
    unsetUser();
    queryClient.removeQueries();
    usePersistUserStore.persist.clearStorage();
    usePersistSettingsStore.persist.clearStorage();
    usePersistUIStore.persist.clearStorage();
  }

  return (
    <>
      {user && (
        <ActionsGroup>
          <ActionsLabel>Options</ActionsLabel>

          <ActionsButton
            onClick={() => {
              setAppPopup({ settings: true });
              setAppActionSheet(undefined);
            }}
          >
            Settings
          </ActionsButton>

          <ActionsButton
            onClick={() => {
              logout();
              setAppActionSheet(undefined);
            }}
          >
            Log Out
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

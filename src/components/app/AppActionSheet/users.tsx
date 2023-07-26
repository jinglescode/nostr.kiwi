import { useClipboard } from "@/hooks/useCopyClipboard";
import { useNDK } from "@/libs/ndk";
import { getPublicKeys } from "@/libs/ndk/utils/getPublicKeys";
import { useSessionStore } from "@/libs/zustand/session";
import { sessionUserStore } from "@/libs/zustand/sessionUserStore";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsUsers() {
  const { signer } = useNDK();
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const setUserPanel = sessionUserStore((state) => state.setUserPanel);

  const pkOrNpub = appActionSheet?.pkOrNpub;

  const {
    value,
    onCopy: copyUserNpub,
    hasCopied,
  } = useClipboard(pkOrNpub ? getPublicKeys(pkOrNpub).npub : "");

  return (
    <>
      {pkOrNpub && (
        <ActionsGroup>
          <ActionsLabel>User</ActionsLabel>

          {signer && (
            <>
              <ActionsButton
                onClick={() => {
                  setAppDialog({ userAddToList: getPublicKeys(pkOrNpub).pk });
                  setAppActionSheet(undefined);
                }}
              >
                Add User to List
              </ActionsButton>
            </>
          )}
          <ActionsButton
            onClick={() => {
              setUserPanel({ npubOrPk: pkOrNpub });
              setAppActionSheet(undefined);
            }}
          >
            User Profile
          </ActionsButton>
          <ActionsButton
            onClick={() => {
              copyUserNpub();
              setToastMessage("User's npub copied to clipboard.");
              setAppActionSheet(undefined);
            }}
          >
            Copy User's npub
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

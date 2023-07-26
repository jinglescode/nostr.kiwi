import { useClipboard } from "@/hooks/useCopyClipboard";
import { useSessionStore } from "@/libs/zustand/session";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsUrl() {
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const url = appActionSheet?.url;

  const { value, onCopy, hasCopied } = useClipboard(url ? url : "");

  function _copyNoteId() {
    onCopy();
    setAppActionSheet(undefined);
    setToastMessage("URL copied to clipboard");
  }

  function openUrlNewWindow() {
    window.open(url, "_blank");
  }

  return (
    <>
      {appActionSheet && url && (
        <ActionsGroup>
          <ActionsLabel>URL</ActionsLabel>
          <ActionsButton onClick={() => _copyNoteId()}>Copy URL</ActionsButton>
          <ActionsButton onClick={() => openUrlNewWindow()}>
            Open Link
          </ActionsButton>
        </ActionsGroup>
      )}
    </>
  );
}

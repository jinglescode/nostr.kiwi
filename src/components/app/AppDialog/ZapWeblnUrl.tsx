import { useSessionStore } from "@/libs/zustand/session";
import { f7 } from "framework7-react";
import { useEffect } from "react";

export default function ZapWeblnUrlDialog() {
  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const webLnUrl = appDialog?.webLnUrl;

  useEffect(() => {
    if (webLnUrl) {
      f7.dialog.confirm(
        "Open wallet to confirm transaction.",
        "Sign Transaction",
        () => {
          window.open(appDialog?.webLnUrl, "_blank");
          setAppDialog({ webLnUrl: undefined });
        },
        () => {
          setAppDialog({ webLnUrl: undefined });
        }
      );
    }
  }, [webLnUrl]);

  return <></>;

  // return (
  //   <Dialog
  //     opened={appDialog?.webLnUrl !== undefined}
  //     onBackdropClick={() => setAppDialog({ webLnUrl: undefined })}
  //     title="Sign Transaction"
  //     content="Open wallet to confirm transaction."
  //     buttons={
  //       <>
  //         <DialogButton onClick={() => setAppDialog({ webLnUrl: undefined })}>
  //           Cancel
  //         </DialogButton>
  //         <DialogButton
  //           strong
  //           onClick={() => {
  //             window.open(appDialog?.webLnUrl, "_blank");
  //             setAppDialog({ webLnUrl: undefined });
  //           }}
  //         >
  //           OK
  //         </DialogButton>
  //       </>
  //     }
  //   />
  // );
}

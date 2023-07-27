import { useSessionStore } from "@/libs/zustand/session";
import { f7 } from "framework7-react";
import { useEffect } from "react";

export default function ZapNWCUrlDialog() {
  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const nwcUrl = appDialog?.nwcUrl;

  useEffect(() => {
    if (nwcUrl) {
      f7.dialog.confirm(
        "You have initiated a connection to Nostr Wallet Connect. Please confirm the connection on your wallet.",
        "Authorization NWC Connection",
        () => {
          window.open(appDialog?.nwcUrl, "_blank");
          setAppDialog({ nwcUrl: undefined });
        },
        () => {
          setAppDialog({ nwcUrl: undefined });
        }
      );
    }
  }, [nwcUrl]);

  return <></>;

  // return (
  //   <Dialog
  //     opened={appDialog?.nwcUrl !== undefined}
  //     onBackdropClick={() => setAppDialog({ nwcUrl: undefined })}
  //     title="Authorization NWC Connection"
  //     content="You have initiated a connection to Nostr Wallet Connect. Please confirm the connection on your wallet."
  //     buttons={
  //       <>
  //         <DialogButton onClick={() => setAppDialog({ nwcUrl: undefined })}>
  //           Cancel
  //         </DialogButton>
  //         <DialogButton
  //           strong
  //           onClick={() => {
  //             window.open(appDialog?.nwcUrl, "_blank");
  //             setAppDialog({ nwcUrl: undefined });
  //           }}
  //         >
  //           OK
  //         </DialogButton>
  //       </>
  //     }
  //   />
  // );
}

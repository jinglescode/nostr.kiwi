import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useSessionStore } from "@/libs/zustand/session";
import { ELightningNode } from "@/types/Settings";
import { f7 } from "framework7-react";
import { useEffect, useState } from "react";

export default function ZapCustomNWCDialog() {
  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const [inputCustomNwc, setInputCustomNwc] = useState<string>("");
  const setNwcConfig = usePersistSettingsStore((state) => state.setNwcConfig);
  const setLightningMode = usePersistSettingsStore(
    (state) => state.setLightningMode
  );

  const customNwc = appDialog?.customNwc;

  function setCustomNWC(inputCustomNwc: string | undefined) {
    if (inputCustomNwc) {
      setNwcConfig({
        uri: inputCustomNwc,
      });
      setLightningMode(ELightningNode.CustomNWC);
    } else {
      setLightningMode(ELightningNode.Wallets);
    }
    setAppDialog({ customNwc: undefined });
  }

  useEffect(() => {
    if (customNwc) {
      f7.dialog.prompt(
        "Connect your NWC compatible wallet by adding your Nostr Wallet URI.",
        "Authorization NWC Connection",
        (uri) => {
          setCustomNWC(uri);
        },
        () => {
          setCustomNWC(undefined);
        },
        "walletconnect://"
      );
    }
  }, [customNwc]);

  return <></>;
}

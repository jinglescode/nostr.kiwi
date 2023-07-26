import { EZapState, TNote } from "@/types/Note";
import { ArrowPathIcon, BoltIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "framework7-react";
import { useState } from "react";
import useLongPress from "@/hooks/useLongPress";
import { useNDK } from "@/libs/ndk";
import { useSessionStore } from "@/libs/zustand/session";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { ELightningNode } from "@/types/Settings";
import { useZap } from "@/libs/kiwi/nostr/zap";
import { useUserZaps } from "@/libs/ndk/hooks/useUserZaps";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useColor } from "@/libs/kiwi/displays/useColor";

export default function ZapButton({
  note,
  amount,
}: {
  note: TNote;
  amount?: string;
}) {
  const { signer } = useNDK();

  const { createInvoice, windowWebln, nwcZap } = useZap({ note });

  const user = usePersistUserStore((state) => state.user);
  const { data: userZaps } = useUserZaps(user?.pk);

  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const defaultZap = usePersistSettingsStore((state) => state.defaultZap);

  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const lightningMode = usePersistSettingsStore((state) => state.lightningMode);
  const backspaceLongPress = useLongPress(clickedHoldZapButton, 500);

  const color = useColor();

  const [zapState, setZapState] = useState<EZapState>(EZapState.NotZapped);

  function clickedHoldZapButton() {
    setAppDialog({ zap: { note: note } });
  }

  function isError(res: {
    success: boolean;
    state: EZapState;
    error?: string;
  }) {
    if (res.success === false) {
      if (res.error) {
        setToastMessage(res.error);
      }
    }
  }

  async function zapNote() {
    setZapState(EZapState.Zapping);

    const resCreateInvoice = await createInvoice(defaultZap);
    setZapState(resCreateInvoice.state);
    if (resCreateInvoice.success === false) {
      return isError(resCreateInvoice);
    }

    if (lightningMode == ELightningNode.Wallets) {
      const resWindowWebln = await windowWebln(resCreateInvoice.data!);
      setZapState(resWindowWebln.state);
      if (resWindowWebln.success === false) {
        return isError(resWindowWebln);
      }
      if (resWindowWebln.state == EZapState.OpenLnUrl) {
        setAppDialog({ webLnUrl: resWindowWebln.data! });
        return;
      }
    }

    if (
      lightningMode == ELightningNode.AlbyNWC ||
      lightningMode == ELightningNode.CustomNWC
    ) {
      const resNwcZap = await nwcZap(resCreateInvoice.data!);

      setZapState(resNwcZap.state);
      if (resNwcZap.success === false) {
        return isError(resNwcZap);
      }

      if (resNwcZap.state == EZapState.OpenNWCUrl) {
        setAppDialog({ nwcUrl: resNwcZap.data! });
        return;
      }
    }
  }

  let displayAmount = 0;
  if (amount) {
    displayAmount = parseInt(amount);
  }

  if (userZaps && note.id in userZaps) {
    const _sum = userZaps[note.id].reduce((partialSum, a) => partialSum + a, 0);
    displayAmount = displayAmount + _sum;
  }

  return (
    <>
      {zapState === EZapState.NotZapped && (
        <Button
          color={color}
          disabled={!signer}
          onClick={() => zapNote()}
          {...backspaceLongPress}
        >
          <BoltIcon className={`w-4 h-4 mr-1`} />
          {displayAmount}
        </Button>
      )}
      {zapState === EZapState.Zapping && (
        <Button>
          <ArrowPathIcon className="inline w-4 h-4 mr-1 animate-spin" />
        </Button>
      )}
      {(zapState === EZapState.Zapped || (userZaps && note.id in userZaps)) && (
        <Button>
          <BoltIcon className={`w-4 h-4 mr-1`} />
          {displayAmount}
        </Button>
      )}
      {zapState === EZapState.ErrorZapping && (
        <Button>
          <XMarkIcon className={`w-4 h-4 mr-1`} />
        </Button>
      )}
    </>
  );
}

import { useNDK } from "@/libs/ndk";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { EZapState, TNote } from "@/types/Note";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { webln } from "alby-js-sdk";

declare global {
  interface Window {
    webln: any;
  }
}

export function useZap({ note }: { note: TNote }) {
  const { fetchEvents } = useNDK();

  const nwcConfig = usePersistSettingsStore((state) => state.nwcConfig);
  const setNwcConfig = usePersistSettingsStore((state) => state.setNwcConfig);

  async function createInvoice(amount: number) {
    let filter: NDKFilter = {
      ids: [note.requestEventId ? note.requestEventId : note.id],
    };

    const events = await fetchEvents(filter);
    const event = events[0];

    if (event === undefined) {
      return {
        success: false,
        state: EZapState.ErrorZapping,
        error: "Unable to zap this note or user.",
      };
    }

    let invoice: string | null = null;

    try {
      invoice = await event.zap(amount * 1000, "");
    } catch (e) {}

    if (invoice === null) {
      return {
        success: false,
        state: EZapState.ErrorZapping,
        error: "Unable to zap this note or user.",
      };
    }

    return {
      success: true,
      state: EZapState.GottenInvoice,
      data: invoice,
    };
  }

  async function windowWebln(invoice: string) {
    if (window.webln) {
      try {
        await window.webln.enable();
        const res2 = await window.webln?.sendPayment(invoice ?? "");
        console.log("payment", res2);
        return { success: true, state: EZapState.Zapped };
      } catch (e: any) {
        console.error("windowWebln", e);
        return { success: false, state: EZapState.UserCancelled };
      }
    } else {
      return {
        success: true,
        state: EZapState.OpenLnUrl,
        data: `lightning:${invoice}`,
      };
    }
  }

  async function nwcZap(invoice: string) {
    let nwc: undefined | webln.NostrWebLNProvider = undefined;

    if (nwcConfig.uri) {
      nwc = new webln.NostrWebLNProvider({
        nostrWalletConnectUrl: nwcConfig.uri,
        secret: nwcConfig.secret,
      });
    } else if (nwcConfig.pubkey) {
      nwc = new webln.NostrWebLNProvider({
        walletPubkey: nwcConfig.pubkey,
        relayUrl: nwcConfig.relay,
        secret: nwcConfig.secret,
      });
    } else {
      try {
        nwc = webln.NostrWebLNProvider.withNewSecret();
        await nwc.initNWC({
          name: "nostr.kiwi",
        });
        const newNostrWalletConnectUrl = nwc.getNostrWalletConnectUrl(false);
        setNwcConfig({
          ...nwcConfig,
          uri: newNostrWalletConnectUrl,
          secret: nwc.secret,
        });
      } catch (e) {
        const nwc = webln.NostrWebLNProvider.withNewSecret();
        const authUrl = nwc
          .getAuthorizationUrl({
            name: "nostr.kiwi",
            returnTo: `${window.location.origin}/nwc`,
          })
          .toString();
        setNwcConfig({ ...nwcConfig, secret: nwc.secret });
        return {
          success: true,
          state: EZapState.OpenNWCUrl,
          data: authUrl,
        };
      }
    }

    if (nwc === undefined) {
      return {
        success: false,
        state: EZapState.ErrorZapping,
        error:
          "Unable to initialize NWC. Try again later or check your NWC config.",
      };
    }

    await nwc.enable();

    try {
      let response = await nwc.sendPayment(invoice);
      console.info(`payment successful`, response);
      // @ts-ignore
      if ("preimage" in response) {
        return {
          success: true,
          state: EZapState.Zapped,
          data: response.preimage as string,
        };
      } else {
        return {
          success: false,
          state: EZapState.UserCancelled,
          error: "Zap cancelled",
        };
      }
    } catch (e) {
      console.error("nwcZap", e);
      return {
        success: false,
        state: EZapState.UserCancelled,
        error: "Zap cancelled",
      };
    }
  }

  return { createInvoice, windowWebln, nwcZap };
}

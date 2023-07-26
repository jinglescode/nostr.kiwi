import { RELAYS, SPAM_TEXT } from "@/constants/nostr";
import { EThemes } from "@/types/App";
import { ELightningNode } from "@/types/Settings";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PersistState {
  // zap
  defaultZap: number;
  setDefaultZap: (defaultZap: number) => void;
  zapAmounts: number[];
  setZapAmounts: (zapAmounts: number[]) => void;
  lightningMode: ELightningNode;
  setLightningMode: (lightningMode: ELightningNode) => void;
  nwcConfig: {
    secret?: string;
    relay?: string;
    pubkey?: string;
    lud16?: string;
    uri?: string;
  };
  setNwcConfig: (nwcConfig: {
    secret?: string;
    relay?: string;
    pubkey?: string;
    lud16?: string;
    uri?: string;
  }) => void;

  // relay
  relays: string[];
  setRelays: (relays: string[]) => void;

  // reaction
  reactions: string[];
  setReactions: (reactions: string[]) => void;

  // ui
  spamFilters: string[];
  setSpamFilters: (spamFilters: string[]) => void;
  communityShowAllNotes: boolean;
  setCommunityShowAllNotes: (bool: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: EThemes;
  toggleTheme: () => void;
}

export const usePersistSettingsStore = create<PersistState>()(
  persist(
    (set, get) => ({
      defaultZap: 21,
      setDefaultZap: (defaultZap) => set({ defaultZap }),
      zapAmounts: [21, 42, 69, 100, 500, 1000],
      setZapAmounts: (zapAmounts) => set({ zapAmounts }),
      lightningMode: ELightningNode.Wallets,
      setLightningMode: (lightningMode) => set({ lightningMode }),
      nwcConfig: {
        secret: undefined,
        relay: undefined,
        pubkey: undefined,
        lud16: undefined,
        uri: undefined,
      },
      setNwcConfig: (nwcConfig) => set({ nwcConfig }),

      // relay
      relays: RELAYS,
      setRelays: (relays) => set({ relays }),

      // reaction
      reactions: ["👍", "🤙", "🫡", "👏", "💪", "💯"],
      setReactions: (reactions) => set({ reactions }),

      // ui
      spamFilters: SPAM_TEXT,
      setSpamFilters: (spamFilters) => set({ spamFilters }),
      communityShowAllNotes: false,
      setCommunityShowAllNotes: (bool) => set({ communityShowAllNotes: bool }),
      darkMode: true,
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),
      theme: EThemes.ios,
      toggleTheme: () =>
        set({
          theme: get().theme === EThemes.ios ? EThemes.material : EThemes.ios,
        }),
    }),
    {
      name: "kiwi-settings",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

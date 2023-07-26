import { ForYouViews, TabViews } from "@/types/App";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PersistState {
  viewForYou: ForYouViews | string;
  setViewForYou: (view: ForYouViews | string) => void;

  viewTabs: TabViews;
  setViewTabs: (view: TabViews) => void;
}

export const usePersistUIStore = create<PersistState>()(
  persist(
    (set, get) => ({
      viewForYou: ForYouViews.globalCommunties,
      setViewForYou: (view: ForYouViews | string) => set({ viewForYou: view }),

      viewTabs: TabViews.foryou,
      setViewTabs: (view: TabViews) => set({ viewTabs: view }),
    }),
    {
      name: "kiwi-ui",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

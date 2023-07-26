import { TListPanel } from "@/types/App";
import { create } from "zustand";

interface SessionState {
  listPanel: TListPanel | undefined;
  setListPanel: (listPanel: TListPanel | undefined) => void;
}

export const sessionListStore = create<SessionState>()((set, get) => ({
  listPanel: undefined,
  setListPanel: (listPanel) => set({ listPanel: listPanel }),
}));

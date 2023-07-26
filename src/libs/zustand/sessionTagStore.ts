import { TTagPanel } from "@/types/App";
import { create } from "zustand";

interface SessionState {
  tagPanel: TTagPanel | undefined;
  setTagPanel: (tagPanel: TTagPanel | undefined) => void;
}

export const sessionTagStore = create<SessionState>()((set, get) => ({
  tagPanel: undefined,
  setTagPanel: (tagPanel) => set({ tagPanel: tagPanel }),
}));

import { TCommunityPanel } from "@/types/App";
import { create } from "zustand";

interface SessionState {
  communityPanel: TCommunityPanel | undefined;
  setCommunityPanel: (communityPanel: TCommunityPanel | undefined) => void;
}

export const sessionCommunityStore = create<SessionState>()((set, get) => ({
  communityPanel: undefined,
  setCommunityPanel: (communityPanel) => set({ communityPanel: communityPanel }),
}));

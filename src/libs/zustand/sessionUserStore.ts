import { TUserPanel } from "@/types/App";
import { TUser } from "@/types/User";
import { create } from "zustand";

interface SessionState {
  userPanel: TUserPanel | undefined;
  setUserPanel: (userPanel: TUserPanel | undefined) => void;
}

export const sessionUserStore = create<SessionState>()((set, get) => ({
  userPanel: undefined,
  setUserPanel: (userPanel) => set({ userPanel: userPanel }),
}));

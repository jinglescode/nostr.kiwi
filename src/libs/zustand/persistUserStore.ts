import { LoginLocalStorage } from "@/types/LoginLocalStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PersistState {
  user: LoginLocalStorage | undefined;
  setUser: (user: LoginLocalStorage) => void;
  unsetUser: () => void;
}

export const usePersistUserStore = create<PersistState>()(
  persist(
    (set, get) => ({
      user: undefined,
      setUser: (user: LoginLocalStorage) => set({ user }),
      unsetUser: () => set({ user: undefined }),
    }),
    {
      name: "kiwi-user",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

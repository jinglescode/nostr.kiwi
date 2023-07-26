import { TActionSheet, TAppDialog, TPopup, TSheetModal } from "@/types/App";
import { create } from "zustand";

interface SessionState {
  isClientActive: boolean;
  setClientActive: (bool: boolean) => void;

  toastMessage: string;
  setToastMessage: (message: string) => void;

  appActionSheet: TActionSheet | undefined;
  setAppActionSheet: (actionsheet: TActionSheet | undefined) => void;

  appDialog: TAppDialog | undefined;
  setAppDialog: (obj: TAppDialog | undefined) => void;

  appPopup: TPopup | undefined;
  setAppPopup: (obj: TPopup | undefined) => void;

  appSheetModal: TSheetModal | undefined;
  setAppSheetModal: (obj: TSheetModal | undefined) => void;

  communityView: string;
  setCommunityView: (view: string) => void;

  scrollReachTopPage: boolean;
  setScrollReachTopPage: (bool: boolean) => void;
}

export const useSessionStore = create<SessionState>()((set, get) => ({
  isClientActive: false,
  setClientActive: (bool) => set({ isClientActive: bool }),
  toastMessage: "",
  setToastMessage: (message) => set({ toastMessage: message }),
  appActionSheet: undefined,
  setAppActionSheet: (actionSheet) => set({ appActionSheet: actionSheet }),
  appDialog: undefined,
  setAppDialog: (dialog) => set({ appDialog: dialog }),
  appPopup: undefined,
  setAppPopup: (popup) => set({ appPopup: popup }),
  appSheetModal: undefined,
  setAppSheetModal: (sheetModal) => set({ appSheetModal: sheetModal }),
  communityView: "feed",
  setCommunityView: (view) => set({ communityView: view }),
  scrollReachTopPage: true,
  setScrollReachTopPage: (bool) => set({ scrollReachTopPage: bool }),
}));

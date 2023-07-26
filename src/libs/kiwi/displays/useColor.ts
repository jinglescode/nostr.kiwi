import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";

export function useColor() {
  const darkMode = usePersistSettingsStore((state) => state.darkMode);
  return darkMode ? "white" : "black";
}

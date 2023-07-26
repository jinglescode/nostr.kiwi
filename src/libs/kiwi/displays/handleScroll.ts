import { useSessionStore } from "@/libs/zustand/session";

export function useHandleScroll() {
  const setScrollReachTopPage = useSessionStore(
    (state) => state.setScrollReachTopPage
  );

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    if (e.currentTarget.scrollTop === 0) {
      setScrollReachTopPage(true);
    } else {
      setScrollReachTopPage(false);
    }
  }

  return handleScroll;
}

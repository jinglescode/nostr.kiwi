import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import SessionPage from "./session";
import LoginPage from "./login";

export default function UserPage() {
  const user = usePersistUserStore((state) => state.user);
  return <>{user ? <SessionPage /> : <LoginPage />}</>;
}

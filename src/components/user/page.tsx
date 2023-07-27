import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import LoginPage from "./login";
import UsersPage from "../users/page";

export default function UserPage() {
  const user = usePersistUserStore((state) => state.user);
  return <>{user ? <UsersPage pk={user.pk} /> : <LoginPage />}</>;
}

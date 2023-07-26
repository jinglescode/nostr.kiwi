import { useSessionStore } from "@/libs/zustand/session";
import ListUsers from "../../list/ListUsers";

export default function UserListPopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.userList === undefined) return <></>;

  const userList = appPopup.userList;

  return (
    <>
      <ListUsers id={userList} />
    </>
  );
}

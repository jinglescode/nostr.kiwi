import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import UserContent from "../UserContent";
import { Page } from "framework7-react";

export default function SessionPage() {
  const user = usePersistUserStore((state) => state.user);

  if (user === undefined) return <></>;

  return (
    <Page>
      <UserContent npubOrPk={user?.pk} />
    </Page>
  );
}

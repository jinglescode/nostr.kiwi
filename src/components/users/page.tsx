import { NavTitle, Navbar, Page } from "framework7-react";
import UserContent from "../user/UserContent";
import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";

export default function UsersPage({ id }: { id: string }) {
  const { data: user } = useUserProfile(id);

  return (
    <Page>
      <Navbar backLink="Back">
        <NavTitle>{user?.displayName}</NavTitle>
      </Navbar>
      <UserContent npubOrPk={id} />
    </Page>
  );
}

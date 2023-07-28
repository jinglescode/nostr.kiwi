import UsersPage from "@/components/users/page";
import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import { Navbar, Page } from "framework7-react";

export default function UserIdPage(props: any) {
  const { id, f7route } = props;
  const { data: user } = useUserProfile(id);

  return (
    <Page>
      <Navbar backLink="back" title={user?.displayName}></Navbar>
      <UsersPage pk={id} />
    </Page>
  );
}

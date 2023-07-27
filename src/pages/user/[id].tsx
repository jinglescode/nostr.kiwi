import UsersPage from "@/components/users/page";
import { Navbar, Page } from "framework7-react";

export default function UserIdPage(props: any) {
  const { id, f7route } = props;
  return (
    <Page>
      <Navbar backLink="back"></Navbar>
      <UsersPage pk={id} />
    </Page>
  );
}

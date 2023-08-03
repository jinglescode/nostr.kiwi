import { useUserList } from "@/libs/ndk/hooks/useUserList";
import {
  Button,
  Icon,
  Link,
  NavLeft,
  NavRight,
  NavTitle,
  Navbar,
  Page,
  f7,
} from "framework7-react";
import ListFeed from "./ListFeed";
import { useSessionStore } from "@/libs/zustand/session";

export default function ListFeedPage({
  id,
  pk,
  kind,
}: {
  id: string;
  pk: string;
  kind: number;
}) {
  const { data } = useUserList(pk, id, kind);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

  if (data === undefined) return <></>;

  return (
    <>
      <Page>
        <Navbar backLink={f7.view.main.history.length > 1 ? "Back" : false}>
          {f7.view.main.history.length <= 1 && (
            <NavLeft>
              <Link href="/app/" external>
                <img
                  src="/images/logo/rounded-512.png"
                  className="w-8 md:hidden"
                />
              </Link>
            </NavLeft>
          )}
          <NavTitle>{data.id}</NavTitle>
          <NavRight>
            <Button onClick={() => setAppActionSheet({ listUsers: data })}>
              <Icon ios="f7:ellipsis_vertical" md="material:more_vert"></Icon>
            </Button>
          </NavRight>
        </Navbar>

        <ListFeed list={data} />
      </Page>
    </>
  );
}

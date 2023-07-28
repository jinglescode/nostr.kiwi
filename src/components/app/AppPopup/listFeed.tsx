import { useSessionStore } from "@/libs/zustand/session";
import ListFeed from "@/components/list/ListFeed";

export default function ListFeedPopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.listFeed === undefined) return <></>;

  const listFeed = appPopup.listFeed;

  if (listFeed === undefined) return <></>;

  return (
    <>
      <ListFeed list={listFeed} />
    </>
  );
}

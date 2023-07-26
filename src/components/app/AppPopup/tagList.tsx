import { useSessionStore } from "@/libs/zustand/session";
import ListTags from "../../list/ListTags";

export default function TagListPopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.tagList === undefined) return <></>;

  const tagList = appPopup.tagList;

  return <ListTags id={tagList} />;
}

import { useSessionStore } from "@/libs/zustand/session";
import ArticlePage from "../../article/ArticlePage";

export default function ArticlePopup() {
  const appPopup = useSessionStore((state) => state.appPopup);

  if (appPopup === undefined || appPopup.article === undefined) return <></>;

  return <ArticlePage article={appPopup.article} />;
}

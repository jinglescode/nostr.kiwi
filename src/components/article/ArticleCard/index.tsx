import { useSessionStore } from "@/libs/zustand/session";
import { TArticle } from "@/types/Article";
import {
  BlockTitle,
  Card,
  CardFooter,
  Chip,
  Link,
  Block,
} from "framework7-react";

export default function ArticleCard({ article }: { article: TArticle }) {
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  return (
    <Link className="w-full">
      <Card>
        <div
          className="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
          style={{
            backgroundImage: `url(${article.image ? article.image : ""})`,
          }}
        ></div>
        <BlockTitle className="!pl-0 text-lg">{article.title}</BlockTitle>
        <Block>{article.summary}</Block>
        <CardFooter>
          <div>
            {article.topicTags.map((tag, i) => {
              return (
                <Chip className="m-0.5" key={i}>
                  {tag}
                </Chip>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

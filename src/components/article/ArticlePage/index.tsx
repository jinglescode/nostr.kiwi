import { TArticle } from "@/types/Article";
import { Block, BlockTitle } from "framework7-react";
import Image from "../../common/Image";

export default function ArticlePage({ article }: { article: TArticle }) {
  return (
    <>
      {article.image && <Image src={article.image} alt="article avatar" />}
      <BlockTitle>
        <h1 className="text-2xl font-bold">{article.title}</h1>
      </BlockTitle>

      <Block>
        <div className="prose dark:prose-invert lg:prose-xl break-words overflow-x-hidden">
          {/* <ContentParser note={article} /> */}
        </div>
      </Block>
    </>
  );
}

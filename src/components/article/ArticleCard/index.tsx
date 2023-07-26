import { useSessionStore } from "@/libs/zustand/session";
import { TArticle } from "@/types/Article";
import {
  BlockTitle,
  Card,
  CardFooter,
  Chip,
  CardContent,
  Link,
  CardHeader,
  Button,
  Block,
} from "framework7-react";

export default function ArticleCard({ article }: { article: TArticle }) {
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  return (
    <Card expandable>
      <CardContent padding={false}>
        <div
          style={{
            background: `url(${
              article.image ? article.image : "/images/logo/squared-512.png"
            }) no-repeat center bottom`,
            backgroundSize: "cover",
            height: "200px",
          }}
        />
        <Link
          cardClose
          color="white"
          className="card-opened-fade-in"
          style={{ position: "absolute", right: "15px", top: "15px" }}
          iconF7="xmark_circle_fill"
        />
        <CardHeader style={{ height: "100px" }}>
          <div className="flex flex-col">
            <div>{article.title}</div>
            <Block className="text-sm">
              <small style={{ opacity: 0.7 }}>{article.summary}</small>
            </Block>
          </div>
        </CardHeader>
        <div className="card-content-padding">
          {/* <ContentParser note={article} /> */}
          <p>
            <Button fill round large cardClose>
              Close
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // return (
  //   <Card>
  //     <div
  //       className="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
  //       style={{
  //         backgroundImage: `url(${article.image ? article.image : ""})`,
  //       }}
  //     ></div>
  //     <BlockTitle withBlock={false} className="!pl-0 text-lg">
  //       {article.title}
  //     </BlockTitle>
  //     {/* <div className="text-gray-500 mb-3">Posted on January 21, 2021</div> */}
  //     <p>{article.summary}</p>
  //     <CardFooter>
  //       {article.topicTags.map((tag, i) => {
  //         return (
  //           <Chip className="m-0.5" key={i}>
  //             {tag}
  //           </Chip>
  //         );
  //       })}
  //     </CardFooter>
  //   </Card>
  // );
}

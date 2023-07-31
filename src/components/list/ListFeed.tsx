import { useFeedAuthors } from "@/libs/ndk/hooks/useFeedAuthors";
import { useFeedTags } from "@/libs/ndk/hooks/useFeedTags";
import { TTagList, TUserList } from "@/types/List";
import { TNote } from "@/types/Note";
import FeedLayout from "../app/layouts/feed";

export default function ListFeed({ list }: { list: TUserList | TTagList }) {
  let pks = list.type == "user" ? list.items : undefined;
  let tags = list.type == "tag" ? list.items : undefined;

  const {
    isFetching: fetchingAuthors,
    data: feedAuthors,
    status: statusAuthors,
  } = useFeedAuthors(pks, `list::${list.id}`);

  const {
    isFetching: fetchingTags,
    data: feedTags,
    status: statusTags,
  } = useFeedTags(tags, `list::${list.id}`, false);

  if (list === undefined) return <></>;

  let feed: TNote[] | undefined = undefined;
  if (feedAuthors) feed = feedAuthors;
  if (feedTags) feed = feedTags;

  return (
    <>
      <FeedLayout
        feed={feed}
        isFetching={fetchingAuthors || fetchingTags}
        // status={
        //   statusAuthors == "loading" || statusTags == "loading"
        //     ? "loading"
        //     : statusAuthors == "success" || statusTags == "success"
        //     ? "success"
        //     : "error"
        // }
        alwaysUpdated={true}
      />
    </>
  );
}

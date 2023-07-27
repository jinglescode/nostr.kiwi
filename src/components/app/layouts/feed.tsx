import { TNote } from "@/types/Note";
import { TArticle } from "@/types/Article";
import { FeedViews } from "@/types/App";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/libs/zustand/session";
import NoteBlock from "@/components/note/NoteBlock";
import { Block, Preloader, Page } from "framework7-react";
import ArticleCard from "@/components/article/ArticleCard";
import { Virtuoso } from "react-virtuoso";

export default function FeedLayout({
  feed,
  isFetching,
  noteApprove,
  noteView = FeedViews.users,
  alwaysUpdated = false,
  refetch,
}: {
  feed: TNote[] | undefined | TArticle[];
  isFetching?: boolean;
  noteApprove?: boolean;
  noteView?: FeedViews;
  alwaysUpdated?: boolean;
  refetch?: Function;
}) {
  const [displayFeed, setDisplayFeed] = useState<TNote[] | TArticle[]>([]);

  const scrollReachTopPage = useSessionStore(
    (state) => state.scrollReachTopPage
  );

  useEffect(() => {
    showLatestFeed();
  }, [feed]);

  useEffect(() => {
    if (scrollReachTopPage) {
      showLatestFeed();
    }
  }, [scrollReachTopPage]);

  function showLatestFeed() {
    if (feed && feed.length > 0) {
      if (displayFeed.length == 0) {
        setDisplayFeed(feed as TNote[] | TArticle[]);
      } else if (feed[0].id != displayFeed[0].id) {
        setDisplayFeed(feed as TNote[] | TArticle[]);
      }
    }
  }

  useEffect(() => {
    if (alwaysUpdated && feed) {
      setDisplayFeed(feed as TNote[] | TArticle[]);
    }
  }, [alwaysUpdated, feed]);

  function rowRenderer({
    index,
    note,
  }: {
    index: number;
    note: TNote | TArticle;
  }) {
    return (
      <>
        {note.kind == 30023 ? (
          <ArticleCard key={`${note.id}${index}`} article={note as TArticle} />
        ) : (
          <NoteBlock
            key={`${note.id}${index}`}
            note={note}
            noteApprove={noteApprove}
            noteView={noteView}
          />
        )}
      </>
    );
  }

  async function ptrRerefresh(done: Function) {
    if (refetch) {
      await refetch();
    }
    done();
  }

  return (
    <Page ptr onPtrRefresh={ptrRerefresh}>
      {/* <> */}
      {/* <div>
        {displayFeed.map((note, i) => {
          if (note.kind == 30023) {
            return (
              <ArticleCard key={`${note.id}${i}`} article={note as TArticle} />
            );
          } else {
            return (
              <NoteBlock
                key={`${note.id}${i}`}
                note={note}
                noteApprove={noteApprove}
                noteView={noteView}
              />
            );
          }
        })}
      </div> */}

      {isFetching && displayFeed.length == 0 && (
        // <Fab
        //   className="fixed left-4-safe bottom-20-safe z-20"
        //   icon={<ArrowPathIcon className="w-7 h-7 animate-spin" />}
        // />
        <Block className="text-center">
          <Preloader />
        </Block>
      )}

      <Virtuoso
        style={{ height: "100%" }}
        data={displayFeed}
        itemContent={(index, note) => rowRenderer({ index, note })}
      />

      {/* todo, there is 1 sec after loaded, showing "no notes" */}
      {/* {status == "success" && !isFetching && feed && feed.length === 0 && (
        <Block className="text-center">No Notes.</Block>
      )} */}
    </Page>
  );
}

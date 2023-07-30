import { Button, Icon, Block, Link, Preloader } from "framework7-react";
import InputSearch from "../common/form/InputSearch";
import { useEffect, useRef, useState } from "react";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useUserFollowings } from "@/libs/ndk/hooks/useUserFollowings";
import { useQueryClient } from "@tanstack/react-query";
import { TUser } from "@/types/User";
import { nostaddress } from "@/libs/api.nostrcheck.me/nostaddress";
import { getPublicKeys } from "@/libs/ndk/utils/getPublicKeys";
import { Virtuoso } from "react-virtuoso";
import UserHeader from "../user/UserHeader";
import useCommuntiesList from "../community/useCommuntiesList";
import CommunityCard from "../community/CommunityCard";
import { TCommunity } from "@/types/Community";
import { nip19 } from "nostr-tools";
import { wineSearch } from "@/libs/api.nostr.wine/wineSearch";
import NoteBlock from "../note/NoteBlock";

let timeout: any;

type SearchResult = {
  type: "user" | "community" | "hashtag" | "note";
  id: string;
  community?: TCommunity;
};

enum View {
  users,
  communities,
  hashtags,
  notes,
}

export default function SearchPage() {
  const text = useRef<string>("");
  const searchResults = useRef<SearchResult[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [view, setView] = useState<View>(View.users);
  const [loading, setLoading] = useState<boolean>(false);

  // search bar
  function debounce(callback: Function, delay: number) {
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }

  function onInputChange(e: any) {
    text.current = e.target.value.toLowerCase();
    setInputSearch(text.current);
  }

  function rowRenderer({
    index,
    result,
  }: {
    index: number;
    result: SearchResult;
  }) {
    return (
      <>
        {result.type == "user" && (
          <div className="px-4">
            <UserHeader pk={result.id} />
          </div>
        )}
        {result.type == "community" && (
          <Link href={`/communities/${result.community?.id}/`} className="px-4">
            <CommunityCard style={5} community={result.community!} />
          </Link>
        )}
        {result.type == "note" && <NoteBlock eventId={result.id} />}
        {/* {result.type == "hashtag" && <Tag tag={result.id!} />} */}
      </>
    );
  }

  // user search
  const user = usePersistUserStore((state) => state.user);
  const { data: followings } = useUserFollowings(user ? user.pk : undefined);

  const queryClient = useQueryClient();

  const data: (TUser | undefined)[] | undefined = followings
    ? followings.map((pk) => queryClient.getQueryData(["user", pk, "profile"]))
    : undefined;

  async function searchNostaddress() {
    try {
      const pk = await nostaddress(inputSearch);
      if (pk) {
        searchResults.current = [
          ...searchResults.current,
          { type: "user", id: pk },
        ];
      }
    } catch (e) {}
  }

  async function checkPublicKey() {
    if (inputSearch.includes("npub1")) {
      try {
        const pks = getPublicKeys(inputSearch);
        if (pks) {
          searchResults.current = [
            ...searchResults.current,
            { type: "user", id: pks.pk },
          ];
        }
      } catch (e) {}
    }
  }

  async function checkFollowings() {
    if (data) {
      data
        .filter((user) => {
          return user && user.displayName.toLowerCase().includes(searchTerm);
        })
        .forEach((user) => {
          searchResults.current = [
            ...searchResults.current,
            { type: "user", id: user?.pk! },
          ];
        });
    }
  }

  // communities
  const communities = useCommuntiesList({
    inputSearch: searchTerm,
    pk: user?.pk,
  });

  async function checkCommuntiesList() {
    if (communities) {
      communities.forEach((community) => {
        searchResults.current = [
          ...searchResults.current,
          { type: "community", id: community.id, community: community },
        ];
      });
    }
  }

  // notes
  async function searchNotes() {
    if (searchTerm.includes("note1")) {
      let eventId = nip19.decode(searchTerm).data as
        | string
        | nip19.EventPointer;
      eventId = typeof eventId === "string" ? eventId : eventId.id;
      searchResults.current = [
        ...searchResults.current,
        { type: "note", id: eventId },
      ];
    } else {
      const resWineSearch = (await wineSearch(searchTerm)) as
        | { id: string }[]
        | undefined;
      if (resWineSearch) {
        const _results = resWineSearch.map((r) => ({ type: "note", id: r.id }));
        //@ts-ignore
        searchResults.current = [...searchResults.current, ..._results];
      }
    }
  }

  // hashtags
  // const { data: tags } = useUserListTags(user ? user.pk : undefined);

  // async function searchHashtags() {
  //   if (tags) {
  //     Object.keys(tags).map((listName) => {
  //       return tags[listName].items.map((tag, i) => {
  //         if (tag.toLowerCase().includes(searchTerm)) {
  //           searchResults.current = [
  //             ...searchResults.current,
  //             { type: "hashtag", id: tag },
  //           ];
  //         }
  //       });
  //     });
  //   }
  // }

  // search

  async function search(searchTerm: string) {
    setResults([]);
    searchResults.current = [];
    setLoading(true);

    console.log(44, "searching", searchTerm);

    if (searchTerm.length === 0) return;

    setLoading(true);

    // users
    if (view == View.users) {
      await checkPublicKey();
      await searchNostaddress();
      await checkFollowings();
    }

    //communities
    if (view == View.communities) {
      await checkCommuntiesList();
    }

    // notes
    if (view == View.notes) {
      await searchNotes();
    }

    // hashtags
    // if (view == View.hashtags) {
    //   await searchHashtags();
    // }

    searchResults.current = searchResults.current.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    setResults(searchResults.current);
    setLoading(false);
  }

  useEffect(() => {
    setResults([]);
    searchResults.current = [];
  }, [inputSearch]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      search(searchTerm);
    }
  }, [searchTerm, view]);

  return (
    <>
      <div className="h-full flex flex-col">
        <div>
          <InputSearch
            label="Search"
            placeholder="Search communities, users and hashtags"
            onChange={onInputChange}
            value={inputSearch}
            onValueClear={() => {
              setInputSearch("");
            }}
            onInput={debounce(() => setSearchTerm(text.current), 1000)}
          />
        </div>

        <div className="grid grid-cols-3 grid-gap px-4 mb-4">
          <Button
            fill={view == View.users}
            tonal={view != View.users}
            onClick={() => {
              setView(View.users);
            }}
          >
            <Icon f7="person" md="person" />
          </Button>
          <Button
            fill={view == View.communities}
            tonal={view != View.communities}
            onClick={() => {
              setView(View.communities);
            }}
          >
            <Icon f7="person_3" md="group" />
          </Button>
          <Button
            fill={view == View.notes}
            tonal={view != View.notes}
            onClick={() => {
              setView(View.notes);
            }}
          >
            <Icon f7="doc_append" md="article" />
          </Button>
          {/* <Button
            fill={view == View.hashtags}
            tonal={view != View.hashtags}
            onClick={() => {
              setView(View.hashtags);
            }}
          >
            <Icon f7="number" md="tag" />
          </Button> */}
        </div>

        {loading && (
          <Block className="text-center">
            <Preloader />
          </Block>
        )}

        <Virtuoso
          className="mb-20 overflow-x-hidden"
          style={{ height: "100%" }}
          data={results}
          itemContent={(index, note) => rowRenderer({ index, result: note })}
        />
      </div>
    </>
  );
}

// function Tag({ tag }: { tag: string }) {
//   const setTagPanel = sessionTagStore((state) => state.setTagPanel);
//   const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

//   return (
//     <div key={tag} onClick={() => setTagPanel({ page: { id: tag } })}>
//       <div className="relative flex items-center space-x-4 mb-4 h-10">
//         <div className="overflow-hidden">#{tag}</div>
//         <div className="min-w-0 flex-1"></div>
//         <div>
//           <Button
//             clear
//             onClick={(e) => {
//               setAppActionSheet({ tag: tag });
//               e.stopPropagation();
//             }}
//           >
//             <EllipsisVerticalIcon className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

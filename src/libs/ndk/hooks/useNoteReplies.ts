import { fetchNotes } from "@/libs/kiwi/nostr/fetchNotes";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "..";
import { TNote } from "@/types/Note";
import { STALETIME } from "@/constants/nostr";

export function useNoteReplies(eventId: string | undefined) {
  const { fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery({
    enabled: eventId !== undefined,
    queryKey: ["note", eventId, "replies"],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [1],
        "#e": [eventId!],
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEvents,
        filter: filter,
      });
      console.log(9999, "useNoteReplies", notes.length);

      notes.map((e) => {
        const eTags = e.tags.filter((t) => t[0] === "e");

        const eWithReplyTags = e.tags.filter((t) => t[3] === "reply");

        let replyNoteId = "root";

        if (eTags.length == 1) {
          replyNoteId = eTags[0][1];
        } else if (eWithReplyTags.length > 0) {
          replyNoteId = eWithReplyTags[0][1];
        }

        e.parent = replyNoteId;
      });

      let tree = _list_to_tree([...notes], eventId!);
      tree = sortingData(tree, "created_at", "desc");

      return tree;
    },
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // cacheTime: 1000 * 60 * 60 * 24 * 2,
    staleTime: STALETIME.feed,
  });

  return { status, data, error, isFetching };
}

const sorting = (array: TNote[], label: string, sortedBy: string) => {
  if (sortedBy === "asc")
    return array.sort((a, b) => (a.created_at! > b.created_at! ? 1 : -1));
  return array.sort((a, b) => (b.created_at! > a.created_at! ? 1 : -1));
};

const sortingData = (data: TNote[], label: string, sort: string) => {
  let result: TNote[] = [];

  for (let i = 0; i < data.length; i++) {
    result = sorting(data, label, sort);
    if (data[i].replies && data[i].replies!.length) {
      result[i].replies = sortingData(data[i].replies!, label, sort);
    }
  }

  return result;
};

function _list_to_tree(list: TNote[], parentId: string) {
  let map: { [id: string]: number } = {};
  let node: TNote;
  let roots: TNote[] = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i;
    list[i].replies = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent !== parentId) {
      if (list[map[node.parent!]]) {
        list[map[node.parent!]].replies!.push(node);
      }
    } else {
      roots.push(node);
    }
  }
  return roots;
}

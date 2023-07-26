import { useNDK } from "@/libs/ndk";
import { TTagList } from "@/types/List";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserListTagsPost() {
  const queryClient = useQueryClient();

  const { signPublishEvent } = useNDK();

  return useMutation(
    async (list: TTagList) => {
      list.items = list.items.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

      let _tags = [];
      for (let t of list.items) {
        _tags.push(["t", t]);
      }

      const event = new NDKEvent();
      event.kind = 30001;
      event.content = "";
      event.tags = [["d", list.id], ..._tags];

      const success = await signPublishEvent(event);
      console.log("useUserListTagsPost", event);
      if (success) return { event, list };
      return undefined;
    },
    {
      onSettled: (res) => {
        if (res) {
          queryClient.invalidateQueries(["user", res.event.pubkey, "tags"]);
          queryClient.invalidateQueries([
            "feed",
            "tags",
            `list::${res.list.id}`,
          ]);
        }
      },
    }
  );
}

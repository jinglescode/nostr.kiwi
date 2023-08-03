import { useNDK } from "@/libs/ndk";
import { TUserList } from "@/types/List";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserListUsersPost() {
  const queryClient = useQueryClient();

  const { ndk, signPublishEvent } = useNDK();

  return useMutation(
    async (list: TUserList) => {
      if (!ndk) return undefined;

      list.items = list.items.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

      let _tags = [];
      for (let t of list.items) {
        _tags.push(["p", t]);
      }

      const event = new NDKEvent();
      event.kind = 30000;
      event.content = "";
      event.tags = [["d", list.id], ..._tags];

      const success = await signPublishEvent(event);
      console.log("useUserListUsersPost", event);
      if (success) return { event, list };
      return undefined;
    },
    {
      onSettled: (res) => {
        if (res) {
          queryClient.invalidateQueries(["user", res.event.pubkey, "lists", res.list.id]);
          queryClient.invalidateQueries(["feed", `list::${res.list.id}`]);
        }
      },
    }
  );
}

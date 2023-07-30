import { useNDK } from "@/libs/ndk";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useNotePost() {
  const queryClient = useQueryClient();

  const { ndk, signPublishEvent } = useNDK();

  return useMutation(
    async ({
      event,
      isUserFollowings,
      isCommunity,
      isReply,
    }: {
      event: NDKEvent;
      isUserFollowings?: boolean;
      isCommunity?: string;
      isReply?: string;
    }) => {
      if (!ndk) return undefined;

      const success = await signPublishEvent(event);
      if (success)
        return { event: success, isUserFollowings, isCommunity, isReply };
      return undefined;
    },
    {
      onSettled: (res) => {
        if (res) {
          console.log(555, res);
          if (res.isCommunity) {
            queryClient.invalidateQueries(["feed", res.isCommunity, "all"]);
            queryClient.invalidateQueries(["feed", res.isCommunity, "mod"]);
          }
          if (res.isReply) {
            queryClient.invalidateQueries(["note", res.isReply, "replies"]);
          }

          if (res.isUserFollowings) {
            queryClient.invalidateQueries(["feed", "followings"]);
          }
          // const aTags = event.tags.filter((t) => t[0] === "a");
          // if (aTags.length == 1) {
          //   queryClient.invalidateQueries(["feed", aTags[0][1], "all"]);
          //   queryClient.invalidateQueries(["feed", aTags[0][1], "mod"]);
          // }
        }
      },
    }
  );
}

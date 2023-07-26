import { useNDK } from "@/libs/ndk";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserCommunitiesFollowedPost() {
  const queryClient = useQueryClient();

  const { signPublishEvent } = useNDK();

  return useMutation(
    async ({ ids, communityId }: { ids: string[]; communityId: string }) => {
      let _tags = [];
      for (let t of ids) {
        _tags.push(["a", t]);
      }

      const event = new NDKEvent();
      event.kind = 30001;
      event.content = "";
      event.tags = [["d", "communities"], ..._tags];
      const success = await signPublishEvent(event);
      console.log("useUserCommunitiesFollowedPost", event);
      if (success) return { event, communityId };
      return undefined;
    },
    {
      onSettled: (res) => {
        if (res) {
          queryClient.invalidateQueries([
            "user",
            res.event.pubkey,
            "communities",
            "followed",
          ]);
          queryClient.invalidateQueries([
            "communities",
            res.communityId,
            "followers",
          ]);
          queryClient.invalidateQueries(["feed", "followedCommunities", "all"]);
          queryClient.invalidateQueries(["feed", "followedCommunities", "mod"]);
        }
      },
    }
  );
}

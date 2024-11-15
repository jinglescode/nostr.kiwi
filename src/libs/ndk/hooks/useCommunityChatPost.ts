import { useNDK } from "@/libs/ndk";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCommunityChatPost() {
  const queryClient = useQueryClient();

  const { ndk, signPublishEvent } = useNDK();

  return useMutation(
    async (event: NDKEvent) => {
      if (!ndk) return undefined;
      const success = await signPublishEvent(event);
      if (success) return event;
      return undefined;
    },
    {
      onSettled: (event) => {
        if (event) {
          const aTags = event.tags.filter((t) => t[0] === "a");
          if (aTags.length > 0) {
            queryClient.invalidateQueries(["chat", aTags[0][1]]);
          }
        }
      },
    }
  );
}

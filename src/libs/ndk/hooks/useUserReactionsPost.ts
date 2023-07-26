import { useNDK } from "@/libs/ndk";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserReactionsPost() {
  const queryClient = useQueryClient();

  const user = usePersistUserStore((state) => state.user);
  const { signPublishEvent } = useNDK();

  return useMutation(
    async ({ content, noteId }: { content: string; noteId: string }) => {
      if (user === undefined) return undefined;

      const event = new NDKEvent();
      event.kind = 7;
      event.content = content;
      event.tags = [
        ["e", noteId],
        ["p", user.pk],
      ];

      const success = await signPublishEvent(event);
      if (success) return event;
      return undefined;
    },
    {
      onSettled: (event) => {
        if (event) {
          queryClient.invalidateQueries(["user", event.pubkey, "reactions"]);
        }
      },
    }
  );
}

import { f7 } from "framework7-react";

import { useSessionStore } from "@/libs/zustand/session";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { useEffect, useState } from "react";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { encodeNote } from "@/libs/ndk/utils/note";
import { useNotePost } from "@/libs/ndk/hooks/useNotePost";

export default function CommunityRepostDialog() {
  const { mutate: mutateNote, isSuccess, isError } = useNotePost();

  const appDialog = useSessionStore((state) => state.appDialog);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  const repostNoteToCommunity = appDialog?.repostNoteToCommunity;

  const user = usePersistUserStore((state) => state.user);
  const { data: userCommunitiesFollowed } = useUserCommunitiesFollowed(
    user?.pk
  );
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(
    user?.pk
  );

  let pinnedCommunities: string[] = [];
  if (userCommunitiesFollowed) {
    pinnedCommunities = [...userCommunitiesFollowed];
  }
  if (userCommunitiesModerator) {
    pinnedCommunities = [
      ...pinnedCommunities,
      ...userCommunitiesModerator.map((community) => community.id),
    ];
  }

  useEffect(() => {
    if (isSuccess) {
      setToastMessage("Note reposted");
      setAppDialog({ repostNoteToCommunity: undefined });
    }
    if (isError) {
      setToastMessage("Failed to reposted note");
      setAppDialog({ repostNoteToCommunity: undefined });
    }
  }, [isSuccess, isError]);

  async function repostNote(selectedCommunityId: string) {
    if (repostNoteToCommunity === undefined || user === undefined) return;

    console.log("repostNote", selectedCommunityId);

    const noteId = encodeNote(repostNoteToCommunity.noteId);

    const event = new NDKEvent();
    event.content = `nostr:${noteId}`;
    event.tags = [
      ["p", user.pk],
      ["a", selectedCommunityId],
      ["q", repostNoteToCommunity.noteId],
    ];
    event.kind = 1;

    mutateNote({
      event: event,
      isCommunity: selectedCommunityId,
    });
  }

  useEffect(() => {
    if (repostNoteToCommunity) {
      f7.dialog
        .create({
          title: "Repost Note to Community",
          buttons: pinnedCommunities.map((id, i) => ({
            text: id.split(":")[2],
            onClick: () => {
              console.log(123, id);
              repostNote(id);
            },
          })),
          verticalButtons: true,
        })
        .open();
    }
  }, [repostNoteToCommunity]);

  return <></>;
}

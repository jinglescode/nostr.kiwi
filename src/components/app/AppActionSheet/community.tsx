import { SITE_URL } from "@/constants/site";
import { useClipboard } from "@/hooks/useCopyClipboard";
import { useCommunity } from "@/libs/ndk/hooks/useCommunity";
import { useFeedCommunity } from "@/libs/ndk/hooks/useFeedCommunity";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { ActionsButton, ActionsGroup, ActionsLabel } from "framework7-react";

export default function AppActionsCommunity() {
  const user = usePersistUserStore((state) => state.user);

  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const communityShowAllNotes = usePersistSettingsStore(
    (state) => state.communityShowAllNotes
  );
  const setCommunityShowAllNotes = usePersistSettingsStore(
    (state) => state.setCommunityShowAllNotes
  );
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(
    user?.pk
  );

  const communityId = appActionSheet?.communityId;

  const { data: community } = useCommunity(communityId);

  // const { refetch } = useFeedCommunity(
  //   community?.id,
  //   community?.moderators,
  //   communityShowAllNotes
  // );

  const { value, onCopy, hasCopied } = useClipboard(
    `${SITE_URL}communities/${
      community?.id &&
      `${community.id.split(":")[2]}/${community.id.split(":")[1]}`
    }`
  );

  function copy() {
    onCopy();
    setToastMessage("Copied to clipboard");
    setAppActionSheet(undefined);
  }

  let isAuthor = false;
  let isModerator = false;
  if (userCommunitiesModerator && community) {
    isModerator = userCommunitiesModerator.some((communityModerator) => {
      return communityModerator.id === community.id;
    });
    isAuthor = userCommunitiesModerator.some((communityModerator) => {
      return (
        communityModerator.id === community.id &&
        communityModerator.author === user?.pk
      );
    });
  }

  return (
    <>
      {appActionSheet && community && (
        <>
          <ActionsGroup>
            <ActionsLabel>Community</ActionsLabel>
            <ActionsButton
              onClick={() => {
                setAppPopup({ community: community });
                setAppActionSheet(undefined);
              }}
            >
              See Community Info
            </ActionsButton>
            <ActionsButton onClick={() => copy()}>
              Copy Community URL
            </ActionsButton>

            <ActionsButton
              onClick={() => {
                setCommunityShowAllNotes(!communityShowAllNotes);
                setAppActionSheet(undefined);
              }}
            >
              {communityShowAllNotes
                ? "See curated notes only"
                : "See all notes"}
            </ActionsButton>

            {/* <ActionsButton
              onClick={() => {
                refetch();
                setAppActionSheet(undefined);
              }}
            >
              Refetch Latest Feed
            </ActionsButton> */}
          </ActionsGroup>

          {isAuthor && (
            <ActionsGroup>
              <ActionsLabel>Administrative</ActionsLabel>
              {isAuthor && (
                <>
                  <ActionsButton
                    onClick={() => {
                      setAppPopup({
                        composeCommunity: { show: true, community },
                      });
                      setAppActionSheet(undefined);
                    }}
                  >
                    Edit Community Info
                  </ActionsButton>
                </>
              )}
            </ActionsGroup>
          )}
        </>
      )}
    </>
  );
}

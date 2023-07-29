import {
  Button,
  NavRight,
  NavTitle,
  Navbar,
  Page,
  Icon,
  Subnavbar,
  Segmented,
} from "framework7-react";
import CommunityContent from "./CommunityContent";
import { useCommunity } from "@/libs/ndk/hooks/useCommunity";
import CommunityImage from "./CommunityImage";
import { useSessionStore } from "@/libs/zustand/session";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { useFeedCommunityArticles } from "@/libs/ndk/hooks/useFeedCommunityArticles";
import CommunityFollowButton from "./CommunityFollowButton";

export default function CommunityPage({ id }: { id: string }) {
  const { data: community } = useCommunity(id);

  const user = usePersistUserStore((state) => state.user);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const communityView = useSessionStore((state) => state.communityView);
  const setCommunityView = useSessionStore((state) => state.setCommunityView);
  const communityShowAllNotes = usePersistSettingsStore(
    (state) => state.communityShowAllNotes
  );
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(
    user?.pk
  );
  const { data: articles, isFetching: isFetchingLongform } =
    useFeedCommunityArticles(community?.id, community?.moderators);

  let isModerator = false;
  if (userCommunitiesModerator && community) {
    isModerator = userCommunitiesModerator.some((communityModerator) => {
      return communityModerator.id === community.id;
    });
  }

  function Title() {
    if (community == undefined) return <></>;
    return (
      <div className="flex items-center space-x-4 w-full justify-center">
        <div className="flex-shrink-0">
          <CommunityImage id={community.id} />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {community.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Page>
      <Navbar backLink="Back">
        <NavTitle>
          <Title />
        </NavTitle>

        <NavRight>
          <CommunityFollowButton community={community} />
          <Button
            onClick={() => setAppActionSheet({ communityId: community?.id })}
          >
            <Icon ios="f7:ellipsis_vertical" md="material:more_vert"></Icon>
          </Button>
        </NavRight>

        <Subnavbar>
          <Segmented strong>
            <Button
              smallMd
              active={communityView == "feed"}
              onClick={() => setCommunityView("feed")}
            >
              {communityShowAllNotes ? "All Feed" : "Curated"}
            </Button>
            {isModerator && (
              <Button
                smallMd
                active={communityView == "approve"}
                onClick={() => setCommunityView("approve")}
              >
                Approve
              </Button>
            )}
            {/* {articles && articles.length > 0 && (
              <Button
                smallMd
                active={communityView == "articles"}
                onClick={() => setCommunityView("articles")}
              >
                Articles
              </Button>
            )} */}
            <Button
              smallMd
              active={communityView == "chat"}
              onClick={() => setCommunityView("chat")}
            >
              Chat
            </Button>
          </Segmented>
        </Subnavbar>
      </Navbar>

      <CommunityContent id={id} />
    </Page>
  );
}

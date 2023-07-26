import { List, ListItem, Page, theme } from "framework7-react";

import { useCommunities } from "@/libs/ndk/hooks/useCommunities";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { sessionCommunityStore } from "@/libs/zustand/sessionCommunityStore";
import { useEffect, useState } from "react";
import { useFeedCommunitiesGlobal } from "@/libs/ndk/hooks/useFeedCommunitiesGlobal";
import InputSearch from "../common/form/InputSearch";
import {
  FaceSmileIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useCommunityFollowers } from "@/libs/ndk/hooks/useCommunityFollowers";
import { TCommunity } from "@/types/Community";
import { Virtuoso } from "react-virtuoso";

export default function CommunitiesPage() {
  const { isFetching, data: communities } = useCommunities();
  const [inputSearch, setInputSearch] = useState<string>("");
  const [communitiesActivityCount, setCommunitiesActivityCount] = useState<{
    [id: string]: number;
  }>({});

  const { data: globalCommunitiesFeed } = useFeedCommunitiesGlobal();

  const setCommunityPanel = sessionCommunityStore(
    (state) => state.setCommunityPanel
  );

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

  // sort communities by activity
  useEffect(() => {
    let _communitiesActivityCount: { [id: string]: number } = {};

    if (globalCommunitiesFeed) {
      for (let i = 0; i < globalCommunitiesFeed.length; i++) {
        const note = globalCommunitiesFeed[i];

        const communityId = note.communityId;

        if (communityId) {
          if (!_communitiesActivityCount[communityId]) {
            _communitiesActivityCount[communityId] = 0;
          }

          _communitiesActivityCount[communityId] += 1;
        }
      }
    }

    setCommunitiesActivityCount(_communitiesActivityCount);
  }, [globalCommunitiesFeed]);

  function rowRenderer({
    index,
    community,
  }: {
    index: number;
    community: TCommunity;
  }) {
    return (
      <List dividersIos mediaList outlineIos strongIos className="m-0">
        <ListItem
          link={`/communities/${community.id}/`}
          title={community.name}
          text={community.description}
        >
          <img
            slot="media"
            className="rounded-lg	w-20 h-16 object-cover"
            src={
              community.image ? community.image : "/images/logo/rounded-512.png"
            }
            onError={(e: any) => {
              e.target.src = "/images/logo/squared-512.png";
            }}
          />

          <span slot="inner-start">
            <CommunityStats community={community} />
          </span>
        </ListItem>
      </List>
    );
  }

  return (
    <Page>
      <div className="h-full flex flex-col">
        <div>
          <InputSearch
            label="Search"
            placeholder="Search for community"
            onChange={(e) => setInputSearch(e.target.value.toLowerCase())}
            value={inputSearch}
            onValueClear={() => {
              setInputSearch("");
            }}
          />
        </div>

        <Virtuoso
          style={{ height: "100%" }}
          data={
            communities
              ? communities
                  .filter((community) => {
                    if (community) {
                      let thisCommunity = "";
                      if (community.name)
                        thisCommunity += community.name.toLowerCase();
                      if (community.description)
                        thisCommunity += community.description.toLowerCase();
                      return thisCommunity.includes(inputSearch);
                    }
                    return false;
                  })
                  .sort((a, b) => {
                    let _a = communitiesActivityCount[a.id] || 0;
                    let _b = communitiesActivityCount[b.id] || 0;

                    if (pinnedCommunities.includes(a.id)) {
                      _a += 1000;
                    }
                    if (pinnedCommunities.includes(b.id)) {
                      _b += 1000;
                    }

                    return _b - _a;
                  })
              : []
          }
          itemContent={(index, community) => rowRenderer({ index, community })}
        />
      </div>

      {/* <List dividersIos mediaList outlineIos strongIos className="m-0">
        {communities &&
          communities
            .filter((community) => {
              if (community) {
                let thisCommunity = "";
                if (community.name)
                  thisCommunity += community.name.toLowerCase();
                if (community.description)
                  thisCommunity += community.description.toLowerCase();
                return thisCommunity.includes(inputSearch);
              }
              return false;
            })
            .sort((a, b) => {
              let _a = communitiesActivityCount[a.id] || 0;
              let _b = communitiesActivityCount[b.id] || 0;

              if (pinnedCommunities.includes(a.id)) {
                _a += 1000;
              }
              if (pinnedCommunities.includes(b.id)) {
                _b += 1000;
              }

              return _b - _a;
            })
            .map((community, i) => {
              return (
                <ListItem
                  key={i}
                  link={`/communities/${community.id}/`}
                  title={community.name}
                  text={community.description}
                  // subtitle='ok'
                  // subtitle={<CommunityStats community={community} />}
                >
                  <div slot="inner">
                    <CommunityStats community={community} />
                  </div>
                  <img
                    slot="media"
                    className="rounded-lg	w-20 h-16 object-cover"
                    src={
                      community.image
                        ? community.image
                        : "/images/logo/rounded-512.png"
                    }
                    onError={(e: any) => {
                      e.target.src = "/images/logo/squared-512.png";
                    }}
                  />
                </ListItem>
              );
            })}
      </List> */}
    </Page>
  );
}

function CommunityStats({ community }: { community: TCommunity }) {
  const { data: communityFollowers } = useCommunityFollowers(community?.id);

  const user = usePersistUserStore((state) => state.user);
  const { data: userCommunitiesFollowed } = useUserCommunitiesFollowed(
    user?.pk
  );
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(
    user?.pk
  );

  let owner =
    userCommunitiesModerator &&
    userCommunitiesModerator
      .map((community) => community.id)
      .includes(community.id);

  let followed = userCommunitiesFollowed?.includes(community.id);

  let communityFollowersCount = communityFollowers
    ? communityFollowers?.length
    : 0;

  return (
    <div className="absolute top-4 right-0 flex flex-row items-center text-shadow h-5 justify-center px-1 gap-2">
      {owner && <FaceSmileIcon className="w-4 h-4" />}
      {followed && <StarIcon className="w-4 h-4" />}
      {communityFollowersCount > 0 && (
        <div className="flex items-center">
          <UserGroupIcon className="w-4 h-4 mr-1" />
          <div>{communityFollowersCount}</div>
        </div>
      )}
    </div>
  );
}

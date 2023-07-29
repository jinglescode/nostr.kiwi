import { useCommunityFollowers } from "@/libs/ndk/hooks/useCommunityFollowers";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import { TCommunity } from "@/types/Community";
import {
  FaceSmileIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { List, ListItem } from "framework7-react";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import useCommuntiesList from "../community/useCommuntiesList";

export default function CommunitiesList({
  inputSearch,
  pk,
  selectedCommunities,
}: {
  inputSearch?: string;
  pk?: string;
  selectedCommunities?: string[];
}) {
  // const [communitiesActivityCount, setCommunitiesActivityCount] = useState<{
  //   [id: string]: number;
  // }>({});

  // const { data: globalCommunitiesFeed } = useFeedCommunitiesGlobal();

  // const { data: userCommunitiesFollowed } = useUserCommunitiesFollowed(pk);
  // const { data: userCommunitiesModerator } = useUserCommunitiesModerator(pk);

  // let pinnedCommunities: string[] = [];
  // if (userCommunitiesFollowed) {
  //   pinnedCommunities = [...userCommunitiesFollowed];
  // }
  // if (userCommunitiesModerator) {
  //   pinnedCommunities = [
  //     ...pinnedCommunities,
  //     ...userCommunitiesModerator.map((community) => community.id),
  //   ];
  // }

  // // sort communities by activity
  // useEffect(() => {
  //   let _communitiesActivityCount: { [id: string]: number } = {};

  //   if (globalCommunitiesFeed) {
  //     for (let i = 0; i < globalCommunitiesFeed.length; i++) {
  //       const note = globalCommunitiesFeed[i];

  //       const communityId = note.communityId;

  //       if (communityId) {
  //         if (!_communitiesActivityCount[communityId]) {
  //           _communitiesActivityCount[communityId] = 0;
  //         }

  //         _communitiesActivityCount[communityId] += 1;
  //       }
  //     }
  //   }

  //   setCommunitiesActivityCount(_communitiesActivityCount);
  // }, [globalCommunitiesFeed]);

  const communities = useCommuntiesList({
    inputSearch: inputSearch,
    pk: pk,
    selectedCommunities: selectedCommunities,
  });

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
            src={community.image ? community.image : "/images/icons/users.svg"}
            onError={(e: any) => {
              e.target.src = "/images/icons/users.svg";
            }}
          />

          <span slot="inner-start">
            <CommunityStats community={community} pk={pk} />
          </span>
        </ListItem>
      </List>
    );
  }

  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={communities}
      itemContent={(index, community) => rowRenderer({ index, community })}
    />
  );
}

function CommunityStats({
  community,
  pk,
}: {
  community: TCommunity;
  pk?: string;
}) {
  const { data: communityFollowers } = useCommunityFollowers(community?.id);

  const { data: userCommunitiesFollowed } = useUserCommunitiesFollowed(pk);
  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(pk);

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

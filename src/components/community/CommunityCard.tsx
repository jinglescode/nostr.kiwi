import { Block, Card } from "framework7-react";
import { TCommunity } from "@/types/Community";
import Image from "../common/Image";
import {
  StarIcon,
  UserGroupIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import { useCommunityFollowers } from "@/libs/ndk/hooks/useCommunityFollowers";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useUserCommunitiesFollowed } from "@/libs/ndk/hooks/useUserCommunitiesFollowed";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import CommunityImage from "./CommunityImage";

export default function CommunityCard({
  community,
  style = 3,
}: {
  community: TCommunity;
  style?: number;
}) {
  return (
    <>
      {style === 5 && <RectCard community={community} />}
      {style === 4 && <BigCard community={community} />}
      {style === 3 && <V3 community={community} />}
      {style === 2 && <V2 community={community} />}
      {style === 1 && <V1 community={community} />}
    </>
  );
}

function BigCard({ community }: { community: TCommunity }) {
  return (
    <Card>
      <div
        className="ios:-mx-3 ios:-mt-4 h-48 p-4 flex items-end ios:font-bold bg-cover bg-center material:rounded-xl material:text-[22px] text-shadow text-white text-xl"
        style={{
          backgroundImage: `url(${community.image})`,
        }}
      >
        {community.name}
      </div>
    </Card>
  );
}

function RectCard({ community }: { community: TCommunity }) {
  return (
    <div className="relative flex items-center space-x-4 mb-4 h-10">
      <div className="flex-shrink-0">
        <CommunityImage id={community.id} />
      </div>
      <div className="overflow-hidden">{community.name}</div>

      <div className="min-w-0 flex-1"></div>
    </div>
  );
}

function V3({ community }: { community: TCommunity }) {
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
    <Card>
      {(owner || followed || communityFollowersCount > 0) && (
        <div className="absolute top-4 right-0 flex flex-row items-center text-shadow h-5 justify-center bg-[#7E81FF] bg-opacity-60 px-1 gap-2">
          {owner && <FaceSmileIcon className="w-4 h-4" />}
          {followed && <StarIcon className="w-4 h-4" />}
          {communityFollowersCount > 0 && (
            <div className="flex items-center">
              <UserGroupIcon className="w-4 h-4" />
              <div>{communityFollowersCount}</div>
            </div>
          )}
        </div>
      )}

      <div
        className="ios:-mx-3 ios:-mt-4 h-48 p-4 flex items-end ios:font-bold bg-cover bg-center material:rounded-xl material:text-[22px] text-shadow text-white"
        style={{
          backgroundImage: `url(${community.image})`,
        }}
      >
        {community.name}
      </div>
    </Card>
  );
}

function V2({ community }: { community: TCommunity }) {
  return (
    <Block>
      <div className="flex flex-col">
        <div className="flex items-center space-x-4 mb-4 h-10">
          <div className="flex-shrink-0">
            <Image
              src={community.image ? community.image : ""}
              className="h-10 w-10 rounded-full object-cover"
              generateAvatarWithChar={community.name.substring(0, 1)}
              alt="com"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
              {community.name}
            </p>
          </div>
        </div>
        <div className="text-sm">{community.description}</div>
      </div>
    </Block>
  );
}

function V1({ community }: { community: TCommunity }) {
  return (
    <Card outline>
      <div className="flex flex-row w-full h-36">
        {community.image && (
          <Image
            src={community.image ? community.image : ""}
            className="object-cover w-24 h-36 rounded-l-lg"
            generateAvatarWithChar={community.name.substring(0, 1)}
          />
        )}
        <div className="flex flex-col leading-normal m-2">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {community.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all overflow-hidden">
            {community.description}
            {community.id}
          </p>
        </div>
      </div>
    </Card>
  );
}

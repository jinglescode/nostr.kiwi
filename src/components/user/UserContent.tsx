import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import UserImage from "./UserImage";
import { Block } from "framework7-react";
import { useFeedAuthors } from "@/libs/ndk/hooks/useFeedAuthors";
import FeedLayout from "../app/layouts/feed";

export default function UserContent({ npubOrPk }: { npubOrPk: string }) {
  const { data: user } = useUserProfile(npubOrPk);

  const {
    data: feed,
    isFetching,
    status,
    refetch,
  } = useFeedAuthors(user ? [user.pk] : undefined, user ? user.pk : undefined);

  if (user === undefined) return <></>;

  return (
    <>
      <Block>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <UserImage
              pk={user.pk}
              className="h-16 w-16 rounded-full border-2 border-[#7E81FF] object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-col">
              <p className="text-xl font-medium text-gray-900 dark:text-white truncate">
                {user.displayName}
              </p>
              <p className="truncate text-sm text-gray-500">
                {user.userSubTitle}
              </p>
            </div>
          </div>
        </div>
      </Block>

      <Block>
        <p>{user.profile.about}</p>
      </Block>

      <FeedLayout
        feed={feed}
        isFetching={isFetching}
        refetch={refetch}
      />
    </>
  );
}

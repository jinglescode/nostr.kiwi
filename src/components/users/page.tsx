import {
  Block,
  Navbar,
  Page,
  Segmented,
  Subnavbar,
  Button,
  Icon,
} from "framework7-react";
import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import { usePersistUIStore } from "@/libs/zustand/persistUIStore";
import { UsersViews } from "@/types/App";
import UserFeed from "../user/UserFeed";
import UserImage from "../user/UserImage";
import { TUser } from "@/types/User";

export default function UsersPage({ pk }: { pk: string }) {
  const { data: user } = useUserProfile(pk);

  const viewUsers = usePersistUIStore((state) => state.viewUsers);
  const setViewUsers = usePersistUIStore((state) => state.setViewUsers);

  return (
    <Page>
      <div className="grid grid-cols-4 grid-gap p-1 m-2">
        <Button
          active={viewUsers == UsersViews.feed}
          onClick={() => setViewUsers(UsersViews.feed)}
        >
          <Icon f7="doc_append" md="article" />
        </Button>
        <Button
          active={viewUsers == UsersViews.lists}
          onClick={() => setViewUsers(UsersViews.lists)}
        >
          <Icon f7="list_dash" md="list" />
        </Button>
        <Button
          active={viewUsers == UsersViews.communities}
          onClick={() => setViewUsers(UsersViews.communities)}
        >
          <Icon f7="person_3" md="group" />
        </Button>
        <Button
          active={viewUsers == UsersViews.info}
          onClick={() => setViewUsers(UsersViews.info)}
        >
          <Icon f7="person" md="person" />
        </Button>
      </div>

      {viewUsers === UsersViews.feed && <UserFeed npubOrPk={pk} />}
      {viewUsers === UsersViews.info && user && <UserInfo user={user} />}

      {viewUsers === UsersViews.lists && <Block>coming soon</Block>}
      {viewUsers === UsersViews.communities && <Block>coming soon</Block>}
    </Page>
  );
}

function UserInfo({ user }: { user: TUser }) {
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
    </>
  );
}

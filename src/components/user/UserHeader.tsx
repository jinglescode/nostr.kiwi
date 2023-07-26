import { TNote } from "@/types/Note";
import { Button, Link } from "framework7-react";
import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";

import { useSessionStore } from "@/libs/zustand/session";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { getPublicKeys } from "@/libs/ndk/utils/getPublicKeys";
import UserImage from "./UserImage";
import { FeedViews } from "@/types/App";
import CommunityImage from "../community/CommunityImage";
import { TUser } from "@/types/User";
import { useCommunity } from "@/libs/ndk/hooks/useCommunity";
import { sessionUserStore } from "@/libs/zustand/sessionUserStore";
import { sessionCommunityStore } from "@/libs/zustand/sessionCommunityStore";
import getDateTimeSince from "@/libs/kiwi/displays/getDateTimeSince";
import { useColor } from "@/libs/kiwi/displays/useColor";

export default function UserHeader({
  pk,
  npub,
  note,
  rightOptions,
  noteView = FeedViews.users,
}: {
  pk?: string;
  npub?: string;
  note?: TNote;
  rightOptions?: React.ReactNode;
  noteView?: FeedViews;
}) {
  if (note) pk = note.author;
  if (npub) pk = getPublicKeys(npub).pk;

  const communityId = note?.communityId;

  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);
  const color = useColor();

  const { data: user } = useUserProfile(pk);

  return (
    <>
      <div className="relative flex items-center space-x-4 mb-4 h-10">
        <div className="flex-shrink-0">
          {noteView == FeedViews.users && <UserImage pk={pk} />}
          {noteView == FeedViews.communities && (
            <CommunityImage id={note?.communityId} />
          )}
        </div>
        <div className="overflow-hidden">
          {noteView == FeedViews.users && (
            <UserViewNameSection user={user} note={note} />
          )}
          {noteView == FeedViews.communities && (
            <CommunityViewNameSection user={user} note={note} />
          )}
        </div>

        <div className="min-w-0 flex-1"></div>

        {rightOptions === undefined ? (
          <div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setAppActionSheet({
                  pkOrNpub: user ? user.npub : undefined,
                  note: note ? note : undefined,
                  communityId: communityId,
                });
              }}
              color={color}
            >
              <EllipsisVerticalIcon className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          rightOptions
        )}
      </div>
    </>
  );
}

function CommunityViewNameSection({
  user,
  note,
}: {
  user: TUser | undefined;
  note: TNote | undefined;
}) {
  const { data: community } = useCommunity(note?.communityId);
  const setUserPanel = sessionUserStore((state) => state.setUserPanel);
  const setCommunityPanel = sessionCommunityStore(
    (state) => state.setCommunityPanel
  );

  return (
    <>
      {community && (
        <div className="flex flex-col">
          <p
            className="text-sm font-medium text-gray-900 dark:text-white truncate"
            onClick={(e) => {
              e.stopPropagation();
              setCommunityPanel({ page: { communityId: community.id } });
            }}
          >
            {community.name}
            {note && (
              <span className="text-sm text-gray-500">
                {note.created_at && ` · ${getDateTimeSince(note.created_at)}`}
              </span>
            )}
          </p>
          {user && (
            <p
              className="truncate text-sm text-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                setUserPanel({ npubOrPk: user.pk });
              }}
            >
              {user.displayName}
            </p>
          )}
        </div>
      )}
    </>
  );
}

function UserViewNameSection({
  user,
  note,
}: {
  user: TUser | undefined;
  note: TNote | undefined;
}) {
  // const setUserPanel = sessionUserStore((state) => state.setUserPanel);

  return (
    <>
      {user && (
        <Link href={`/user/${user?.pk}`}>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.displayName}
              {note && (
                <span className="text-sm text-gray-500">
                  {note.created_at && ` · ${getDateTimeSince(note.created_at)}`}
                </span>
              )}
            </p>
            <p className="truncate text-sm text-gray-500">
              {user.userSubTitle}
            </p>
          </div>
        </Link>
      )}
    </>
  );
}

import { Actions } from "framework7-react";
import AppActionsUsers from "./users";
import AppActionsNote from "./note";
import AppActionsUrl from "./url";
import { useSessionStore } from "@/libs/zustand/session";
import AppActionsRepost from "./repost";
import AppActionsCommunities from "./communties";
import AppActionsCommunity from "./community";
import AppActionsForyou from "./foryou";
import AppActionsUser from "./user";
import AppActionsListUsers from "./listUsers";
import AppActionsTag from "./tag";
import AppActionsListTags from "./listTags";

export default function AppActionSheet() {
  const appActionSheet = useSessionStore((state) => state.appActionSheet);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

  return (
    <Actions
      opened={appActionSheet !== undefined}
      onActionsClosed={() => setAppActionSheet(undefined)}
    >
      {appActionSheet && (
        <>
          {appActionSheet.note && <AppActionsNote />}
          {appActionSheet.pkOrNpub && <AppActionsUsers />}
          {appActionSheet.url && <AppActionsUrl />}
          {appActionSheet.repost && <AppActionsRepost />}
          {appActionSheet.communities && <AppActionsCommunities />}
          {appActionSheet.communityId && <AppActionsCommunity />}
          {appActionSheet.foryou && <AppActionsForyou />}
          {appActionSheet.user && <AppActionsUser />}
          {appActionSheet.listUsers && <AppActionsListUsers />}
          {appActionSheet.tag && <AppActionsTag />}
          {appActionSheet.listTags && <AppActionsListTags />}
        </>
      )}
    </Actions>
  );
}

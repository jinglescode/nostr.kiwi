import { Page } from "framework7-react";
import PublicNotes from "./PublicNotes";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { usePersistUIStore } from "@/libs/zustand/persistUIStore";
import { ForYouViews } from "@/types/App";
import UsersFollowing from "./UsersFollowing";
import HotNotes from "./HotNotes";
import CommunitiesFollowing from "./CommunitiesFollowing";
import CommunitiesGlobal from "./CommunitiesGlobal";
import ListView from "./ListView";
import NoteComposeFab from "../note/NoteComposeFab";

export default function ForYouPage() {
  const user = usePersistUserStore((state) => state.user);
  return <Page>{user ? <UserActive /> : <PublicNotes />}</Page>;
}

function UserActive() {
  const viewForYou = usePersistUIStore((state) => state.viewForYou);

  return (
    <>
      {viewForYou === ForYouViews.followedUsers && <UsersFollowing />}
      {viewForYou === ForYouViews.hot && <HotNotes />}
      {viewForYou === ForYouViews.followedCommunties && (
        <CommunitiesFollowing />
      )}
      {viewForYou === ForYouViews.globalCommunties && <CommunitiesGlobal />}

      {typeof viewForYou == "string" && viewForYou.includes("list::") && (
        <ListView />
      )}

      <NoteComposeFab />
    </>
  );
}

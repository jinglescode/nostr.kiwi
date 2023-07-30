import { Popup, Page, Navbar, Link, View, NavRight } from "framework7-react";
import { useSessionStore } from "@/libs/zustand/session";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ComposeNotePopup from "./composeNote";
import ComposeCommunityPopup from "./composeCommunity";
import CommunityPopup from "./community";
// import ArticlePopup from "./article";
import SettingsPopup from "./settings";
import UserListPopup from "./userList";
import TagListPopup from "./tagList";
import ListFeedPopup from "./listFeed";
import NotePopup from "./note";

export default function AppPopup() {
  const appPopup = useSessionStore((state) => state.appPopup);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  let title = "";
  if (appPopup?.note) title = "Note";
  if (appPopup?.composeNote) title = "New Note";
  if (appPopup?.composeNote?.replyNote) title = "Reply to Note";
  if (appPopup?.composeCommunity) {
    if (appPopup?.composeCommunity.community == undefined) {
      title = "New Community";
    } else {
      title = "Edit Community";
    }
  }
  if (appPopup?.community) title = "Community Info";
  if (appPopup?.article) title = "Article";
  if (appPopup?.settings) title = "Settings";
  if (appPopup?.userList) title = "Users List";
  if (appPopup?.tagList) title = "Tags List";
  if (appPopup?.listFeed) title = `List: ${appPopup.listFeed.id}`;

  return (
    <Popup
      push={appPopup?.composeNote ? true : false}
      opened={appPopup !== undefined}
      onPopupClosed={() => setAppPopup(undefined)}
    >
      <View>
        <Page>
          <Navbar title={title}>
            <NavRight>
              <Link popupClose>
                <XMarkIcon className="w-8 h-8" />
              </Link>
            </NavRight>
          </Navbar>

          {appPopup && (
            <>
              {appPopup.note && <NotePopup />}
              {appPopup.composeNote && <ComposeNotePopup />}
              {appPopup && (
                <>{appPopup.composeCommunity && <ComposeCommunityPopup />}</>
              )}
              {appPopup.community && <CommunityPopup />}
              {/* {appPopup.article && <ArticlePopup />} */}
              {appPopup.settings && <SettingsPopup />}
              {appPopup.userList && <UserListPopup />}
              {appPopup.tagList && <TagListPopup />}
              {appPopup.listFeed && <ListFeedPopup />}
            </>
          )}
        </Page>
      </View>
    </Popup>
  );
}

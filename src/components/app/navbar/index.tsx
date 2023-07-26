import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import { usePersistUIStore } from "@/libs/zustand/persistUIStore";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useSessionStore } from "@/libs/zustand/session";
import { ForYouViews, TabViews } from "@/types/App";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Navbar,
  Popover,
  List,
  ListItem,
  Link,
  NavLeft,
  NavTitle,
  NavRight,
  Button,
  Icon,
  f7,
} from "framework7-react";

export default function SiteNavbar() {
  const viewTabs = usePersistUIStore((state) => state.viewTabs);
  const user = usePersistUserStore((state) => state.user);
  const { data: userProfile } = useUserProfile(user?.pk);
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

  function Title() {
    const viewForYou = usePersistUIStore((state) => state.viewForYou);
    const setViewForYou = usePersistUIStore((state) => state.setViewForYou);

    function selectView(view: ForYouViews) {
      setViewForYou(view);
    }

    return (
      <>
        {viewTabs === TabViews.foryou && (
          <>
            <Popover className="popover-foryouview">
              <List>
                <ListItem
                  title="Your Communities"
                  onClick={() => {
                    selectView(ForYouViews.followedCommunties);
                    f7.popover.close(".popover-foryouview");
                  }}
                />
                <ListItem
                  title="People You Follow"
                  onClick={() => {
                    selectView(ForYouViews.followedUsers);
                    f7.popover.close(".popover-foryouview");
                  }}
                />
                <ListItem
                  title="Discover Communities"
                  onClick={() => {
                    selectView(ForYouViews.globalCommunties);
                    f7.popover.close(".popover-foryouview");
                  }}
                />
                <ListItem
                  title="Trending Notes"
                  onClick={() => {
                    selectView(ForYouViews.hot);
                    f7.popover.close(".popover-foryouview");
                  }}
                />
              </List>
            </Popover>

            <NavTitle>
              <Link popoverOpen=".popover-foryouview">
                {viewForYou == ForYouViews.followedUsers && "Following"}
                {viewForYou == ForYouViews.followedCommunties &&
                  "Your Communities"}
                {viewForYou == ForYouViews.globalCommunties && "Discover"}
                {viewForYou == ForYouViews.hot && "What's Hot"}
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </Link>
            </NavTitle>
          </>
        )}

        {viewTabs === TabViews.communities && (
          <NavTitle title="Communities" subtitle="For Everyone" />
        )}

        {viewTabs === TabViews.user && (
          <NavTitle title={userProfile?.displayName}></NavTitle>
        )}
      </>
    );
  }

  function LeftNavButton() {
    return <img src="/images/logo/rounded-512.png" className="w-8 md:hidden" />;
  }

  function RightNavButton() {
    return (
      <>
        {viewTabs === TabViews.user && (
          <Button onClick={() => setAppActionSheet({ user: true })}>
            <Icon ios="f7:ellipsis_vertical" md="material:more_vert"></Icon>
          </Button>
        )}
      </>
    );
  }

  return (
    <Navbar>
      <NavLeft>
        <LeftNavButton />
      </NavLeft>

      <Title />

      <NavRight>
        <RightNavButton />
      </NavRight>

      {/* {viewTabs === TabViews.communities && (
        <Subnavbar inner={false}>
          <Searchbar
            searchContainer=".virtual-list"
            searchItem="li"
            searchIn=".item-title"
          />
        </Subnavbar>
      )} */}
    </Navbar>
  );
}

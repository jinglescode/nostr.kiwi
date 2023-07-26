import { Tabs, Page, f7, Tab } from "framework7-react";
import { useEffect } from "react";
import SiteNavbar from "../navbar";
import SiteToolbar from "../toolbar";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import CommunitiesPage from "@/components/communities/page";
import ForYouPage from "@/components/for-you/page";
import { usePersistUIStore } from "@/libs/zustand/persistUIStore";
import { TabViews } from "@/types/App";
import UserPage from "@/components/user/page";

export default function AppLayout() {
  const viewTabs = usePersistUIStore((state) => state.viewTabs);
  const darkMode = usePersistSettingsStore((state) => state.darkMode);

  function setDarkTheme(bool: boolean) {
    f7.setDarkMode(bool);
  }

  useEffect(() => {
    setDarkTheme(darkMode);
  }, [darkMode]);

  return (
    <Page pageContent={false}>
      <SiteNavbar />
      <SiteToolbar />

      <Tabs routable>
        <Tab
          id="tab-foryou"
          className="page-content"
          tabActive={viewTabs === TabViews.foryou}
        >
          <ForYouPage />
        </Tab>
        <Tab
          id="tab-communities"
          className="page-content"
          tabActive={viewTabs === TabViews.communities}
        >
          <CommunitiesPage />
        </Tab>
        <Tab
          id="tab-user"
          className="page-content"
          tabActive={viewTabs === TabViews.user}
        >
          <UserPage />
        </Tab>
      </Tabs>
    </Page>
  );
}

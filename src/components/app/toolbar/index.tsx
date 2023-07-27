import { usePersistUIStore } from "@/libs/zustand/persistUIStore";
import { TabViews } from "@/types/App";
import { Link, Toolbar } from "framework7-react";

export default function SiteToolbar() {
  const viewTabs = usePersistUIStore((state) => state.viewTabs);
  const setViewTabs = usePersistUIStore((state) => state.setViewTabs);

  return (
    <Toolbar tabbar icons position="bottom" className="h-16">
      <Link
        tabLink="#tab-foryou"
        tabLinkActive={viewTabs === TabViews.foryou}
        iconIos="f7:heart"
        iconMd="material:favorite"
        onClick={() => setViewTabs(TabViews.foryou)}
      />
      <Link
        tabLink="#tab-communities"
        tabLinkActive={viewTabs === TabViews.communities}
        iconIos="f7:person_3"
        iconMd="material:group"
        onClick={() => setViewTabs(TabViews.communities)}
      />
      <Link
        tabLink="#tab-search"
        tabLinkActive={viewTabs === TabViews.search}
        iconIos="f7:search"
        iconMd="material:search"
        onClick={() => setViewTabs(TabViews.search)}
      />
      <Link
        tabLink="#tab-user"
        tabLinkActive={viewTabs === TabViews.user}
        iconIos="f7:person"
        iconMd="material:person"
        onClick={() => setViewTabs(TabViews.user)}
      />
    </Toolbar>
  );
}

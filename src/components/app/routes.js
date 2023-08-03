/*
  - Routes involved in Next.js routing (main pages) should be used as "asyncComponent"
  - Routes involved in other Framework7 routers (in Views other than main View) should be imported and used directly as "component"
*/
import LeftPanel from "../../pages/left-panel";

export const routes = [
  {
    path: "/left-panel",
    component: LeftPanel,
  },
  {
    path: "/for-you",
    asyncComponent: () => import("../../pages/for-you"),
  },
  {
    path: "/communities/:id",
    asyncComponent: () => import("../../pages/communities/[id]"),
  },
  {
    path: "/communities/:id/info",
    asyncComponent: () => import("../../pages/communities/[id]/info"),
  },
  {
    path: "/communities/:id/:userid",
    asyncComponent: () => import("../../pages/communities/[id]/[userid]"),
  },
  {
    path: "/user",
    asyncComponent: () => import("../../pages/user"),
  },
  {
    path: "/user/:id",
    asyncComponent: () => import("../../pages/user/[id]"),
  },
  {
    path: "/list/:id/:userid",
    asyncComponent: () => import("../../pages/list/[id]/[userid]"),
  },
  {
    path: "/note/:id",
    asyncComponent: () => import("../../pages/note/[id]"),
  },
  {
    path: "/about",
    asyncComponent: () => import("../../pages/about"),
  },
];

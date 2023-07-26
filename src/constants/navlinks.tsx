import {
  BellIcon,
  HashtagIcon,
  HeartIcon,
  ListBulletIcon,
  UserGroupIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export const NAV_LINKS = [
  {
    name: "For You",
    icon: <HeartIcon className="w-6 h-6" />,
    url: "/for-you",
    key: "for-you",
  },
  {
    name: "Communities",
    icon: <UserGroupIcon className="w-6 h-6" />,
    url: "/communities",
    key: "communities",
  },
  // {
  //   name: "Topics",
  //   icon: <HashtagIcon className="w-6 h-6" />,
  //   url: "/topics",
  //   key: "topics",
  // },
  {
    name: "Search",
    icon: <MagnifyingGlassIcon className="w-6 h-6" />,
    url: "/search",
    key: "search",
  },
  {
    name: "Lists",
    icon: <ListBulletIcon className="w-6 h-6" />,
    url: "/lists",
    key: "lists",
  },
  {
    name: "Activities",
    icon: <BellIcon className="w-6 h-6" />,
    url: "/activities",
    key: "activities",
  },
  {
    name: "User",
    icon: <UserIcon className="w-6 h-6" />,
    url: "/user",
    key: "user",
  },
];

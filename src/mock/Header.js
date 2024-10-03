import { Compass, Store, Users } from "lucide-react";

export const headerMenues = [
  {
    id: 1,
    icon: <Compass />,
    slug: "/explore?type=new",
    name: "Explore",
  },
  {
    id: 2,
    icon: <Users />,
    slug: "/groups?type=all",
    name: "Groups",
  },
  {
    id: 3,
    icon: <Store />,
    slug: "/marketplace?type=nfts",
    name: "Marketplace",
  },
];

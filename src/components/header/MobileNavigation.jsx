"use client";

import Link from "next/link";
import {
  Bell,
  Compass,
  MessageSquareTextIcon,
  Store,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const MobileNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-10 w-full bg-slate-gray py-3 md:py-4">
      <div className="container-fluid">
        <ul className="flex justify-between">
          <li
            className={`rounded-md p-2 hover:bg-[rgba(3,68,49,20%)] ${pathname.includes("explore") ? "bg-[rgba(3,68,49,20%)]" : ""}`}
          >
            <Link
              className={`text-white transition-all duration-200 hover:text-shiny-blue 4xl:text-lg ${pathname.includes("explore") ? "!text-shiny-blue" : ""}`}
              href="/explore?type=trending"
            >
              <Compass />
            </Link>
          </li>
          <li
            className={`rounded-md p-2 hover:bg-[rgba(3,68,49,20%)] ${pathname.includes("groups") ? "bg-[rgba(3,68,49,20%)]" : ""}`}
          >
            <Link
              className={`text-white transition-all duration-200 hover:text-shiny-blue 4xl:text-lg ${pathname.includes("groups") ? "!text-shiny-blue" : ""}`}
              href="/groups?type=joined"
            >
              <Users />
            </Link>
          </li>
          <li
            className={`rounded-md p-2 hover:bg-[rgba(3,68,49,20%)] ${pathname.includes("marketplace") ? "bg-[rgba(3,68,49,20%)]" : ""}`}
          >
            <Link
              className={`text-white transition-all duration-200 hover:text-shiny-blue 4xl:text-lg ${pathname.includes("marketplace") ? "!text-shiny-blue" : ""} `}
              href="/marketplace?type=nfts"
            >
              <Store />
            </Link>
          </li>
          <li
            className={`rounded-md p-2 hover:bg-[rgba(3,68,49,20%)] ${pathname.includes("chat") ? "bg-[rgba(3,68,49,20%)]" : ""}`}
          >
            <Link
              className={`text-white transition-all duration-200 hover:text-shiny-blue 4xl:text-lg ${pathname.includes("chat") ? "!text-shiny-blue" : ""} `}
              href="/chat"
            >
              <MessageSquareTextIcon />
            </Link>
          </li>
          <li
            className={`rounded-md p-2 hover:bg-[rgba(3,68,49,20%)] ${pathname.includes("notifications") ? "bg-[rgba(3,68,49,20%)]" : ""}`}
          >
            <Link
              className={`text-white transition-all duration-200 hover:text-shiny-blue 4xl:text-lg ${pathname.includes("notifications") ? "!text-shiny-blue" : ""} `}
              href="/notifications"
            >
              <Bell />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavigation;

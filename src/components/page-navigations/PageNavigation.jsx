"use client";
import Link from "next/link";
import { CTAButton } from "..";
import { usePathname, useSearchParams } from "next/navigation";
import { Edit, Menu } from "lucide-react";
import { Suspense } from "react";

const Navigation = ({ menus, onButtonClick, buttonLabel, activeDrawer }) => {
  const pathname = usePathname();
  const queryParams = useSearchParams();
  const query = queryParams.get("type");
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-4">
      {menus && (
        <div className="flex gap-2">
          {menus?.map((menu, i) => (
            <Link
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm capitalize text-white transition-all duration-200 hover:bg-slate-gray xl:px-4 xl:py-3 xl:text-[15px] 2xl:text-base 4xl:text-lg ${query === menu?.toLowerCase()?.replaceAll(" ", "-") ? "!bg-[rgba(3,68,49,20%)] !text-shiny-blue" : ""} `}
              key={i}
              href={`${pathname}/?type=${menu.toLowerCase()?.replaceAll(" ", "-")}`}
            >
              {menu}
            </Link>
          ))}
        </div>
      )}
      {activeDrawer && (
        <div className="block xl:hidden">
          <CTAButton onClick={activeDrawer}>
            <Menu />
          </CTAButton>
        </div>
      )}
      {buttonLabel && (
        <div className="hidden xl:block">
          <CTAButton onClick={onButtonClick}>{buttonLabel}</CTAButton>
        </div>
      )}
      {buttonLabel && (
        <div className="fixed bottom-24 right-6 z-20 block h-7 md:bottom-28 md:right-8 xl:hidden">
          <CTAButton
            extra="flex !h-12 !w-12 md:!h-14 md:!w-14 items-center justify-center !rounded-full"
            onClick={onButtonClick}
          >
            <Edit />
          </CTAButton>
        </div>
      )}
    </div>
  );
};

const PageNavigation = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Navigation {...props} />
  </Suspense>
);

export default PageNavigation;

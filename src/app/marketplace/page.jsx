"use client";
import Link from "next/link";
import { ArrowUpDown, Menu, Search } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  CollectionCard,
  CustomInput,
  NFTcard,
  PageNavigation,
} from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectBox from "@/components/input/SelectBox";
import { SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";

import MarketPlaceSidebar from "./MarketPlaceSidebar";

export default function MarketPlace() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketPlaceContent />
    </Suspense>
  );
}

function MarketPlaceContent() {
  const queryParams = useSearchParams();
  const query = queryParams.get("type");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (drawer) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [drawer]);

  return (
    <>
      <PageNavigation menus={["NFTs", "Collections"]} buttonLabel="Create" />
      <div className="mb-20 mt-5 grid grid-cols-1 border-t-2 border-[#2D2D32] pt-6 md:grid-cols-[220px,1fr] md:gap-4 lg:mt-7 lg:gap-6 xl:mb-10 xl:grid-cols-[270px,1fr] xl:gap-8 3xl:mt-10 3xl:gap-10 3xl:pt-8">
        <MarketPlaceSidebar drawer={drawer} setDrawer={setDrawer} />
        <div className="">
          {query === "nfts" && <Nfts setDrawer={setDrawer} />}
          {query === "collections" && <Collections setDrawer={setDrawer} />}
        </div>
      </div>
    </>
  );
}

const Nfts = ({ setDrawer }) => {
  return (
    <>
      <div className="flex gap-2 sm:gap-3 lg:gap-4">
        <div
          onClick={() => setDrawer(true)}
          className="flex items-center rounded-lg bg-blue-gray px-4 text-white md:hidden"
        >
          <Menu />
        </div>
        <div className="w-fit md:w-72 xl:w-64">
          <SelectBox
            placeholder={
              <>
                <span className="md:hidden">
                  <ArrowUpDown />
                </span>
                <span className="hidden text-[15px] md:block 2xl:text-base">
                  Recently Listed
                </span>
              </>
            }
            className="w-full"
          >
            <SelectContent className="relative top-3 w-60 rounded-xl border-blue-gray bg-blue-gray py-4 text-white">
              <SelectItem
                className="bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                value="newest"
              >
                Recently Created
              </SelectItem>
              <SelectItem
                className="mt-4 bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                value="oldest"
              >
                Price: Low to High
              </SelectItem>
              <SelectItem
                className="mt-4 bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                value="top"
              >
                Price: High to Low
              </SelectItem>
            </SelectContent>
          </SelectBox>
        </div>

        <div className="relative w-full">
          <CustomInput
            name="searchGroups"
            placeholder="Search Groups"
            className="pl-12"
          />
          <div className="absolute top-1/2 -translate-y-1/2 pl-3 text-white">
            <Search />
          </div>
        </div>
      </div>
      <div className="mt-5 xl:mt-5 2xl:mt-7 3xl:mt-10">
        <ScrollArea className="h-full overflow-auto p-0 md:h-screen">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 2xl:grid-cols-3 3xl:gap-8">
            {new Array(15).fill(true)?.map((_, i) => (
              <Link key={i} href={"/marketplace/nfts/analog-lines"}>
                <NFTcard />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

const Collections = ({ setDrawer }) => {
  return (
    <>
      <div className="flex gap-2 sm:gap-3 lg:gap-4">
        <div
          onClick={() => setDrawer(true)}
          className="flex items-center rounded-lg bg-blue-gray px-4 text-white md:hidden"
        >
          <Menu />
        </div>
        <div className="w-fit md:w-72 xl:w-64">
          <SelectBox
            placeholder={
              <>
                <span className="md:hidden">
                  <ArrowUpDown />
                </span>
                <span className="hidden text-[15px] md:block 2xl:text-base">
                  Listed NFTs
                </span>
              </>
            }
            className="w-full"
          >
            <SelectContent className="relative top-3 w-60 rounded-xl border-blue-gray bg-blue-gray py-4 text-white">
              <SelectItem
                className="bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                value="volume"
              >
                Volume
              </SelectItem>
            </SelectContent>
          </SelectBox>
        </div>

        <div className="relative w-full">
          <CustomInput
            name="searchCollection"
            placeholder="Search Collections"
            className="pl-12"
          />
          <div className="absolute top-1/2 -translate-y-1/2 pl-3 text-white">
            <Search />
          </div>
        </div>
      </div>
      <div className="mt-5 xl:mt-5 2xl:mt-7 3xl:mt-10">
        <ScrollArea className="h-full overflow-auto p-0 md:h-screen">
          <div className="grid grid-cols-1 gap-4 lg:gap-5 xl:grid-cols-2 2xl:grid-cols-3 3xl:gap-8">
            {new Array(15).fill(true)?.map((_, i) => (
              <Link key={i} href={"/marketplace/collections/lines?type=nfts"}>
                <CollectionCard />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

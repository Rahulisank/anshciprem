"use client";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, Copy, ExternalLink, Menu, Search } from "lucide-react";

import {
  CTAButton,
  CustomInput,
  Dropdown,
  NFTcard,
  PageNavigation,
} from "@/components";
import SelectBox from "@/components/input/SelectBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";

import MarketPlaceSidebar from "../../MarketPlaceSidebar";
import { ASSETS } from "@/assets";

export default function SlugItemDetail() {
  const queryParams = useSearchParams();
  const query = queryParams.get("type");
  const [drawer, setDrawer] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between gap-y-5 border-b-2 border-[#2D2D32] pb-5 md:pb-8 xl:flex-row 3xl:pb-7 4xl:pb-10">
        {/* Left side: Image and brief description */}
        <div className="flex gap-2 sm:gap-3 md:gap-5 xl:w-2/6">
          {/* Image container with fixed size */}
          <div className="!w-24 overflow-hidden xl:h-28 xl:!w-36">
            <Image
              src={ASSETS.NFT}
              alt="nft"
              className="h-full w-full rounded-xl"
            />
          </div>

          {/* Description section */}
          <div className="flex w-full items-center justify-between px-4 xl:block">
            <div>
              <h3 className="text-base font-semibold text-white sm:text-lg 4xl:text-xl">
                Photography
              </h3>
              <p className="flex cursor-pointer items-center gap-2 text-[15px] text-[#a1a1aa] hover:font-semibold">
                <span className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </span>
                <span>Polygon</span>
              </p>
            </div>
            <div className="flex items-center gap-4 xl:mt-4 4xl:mt-6">
              {/* Join button */}
              <CTAButton extra="hidden md:block rounded-full">Follow</CTAButton>

              <Dropdown
                dropdownMenu={[
                  {
                    name: "view",
                    link: "/marketplace/collections/lines?type=nfts",
                  },
                ]}
                contentClass={"xl:!left-24"}
              />
            </div>
          </div>
        </div>
        <CTAButton extra="block md:hidden rounded-full w-max">Follow</CTAButton>
        {/* Right side: Statistics and description */}
        <div className="xl:w-4/6">
          <div className="mb-4 flex flex-wrap gap-12 gap-y-2 sm:gap-24">
            {/* Members statistics */}
            <div className="">
              <p className="mb-1 text-base text-[#a1a1aa] 4xl:text-lg">
                Members
              </p>
              <strong className="text-base text-white 4xl:text-lg">
                30.3k
              </strong>
            </div>

            {/* Posts statistics */}
            <div className="">
              <p className="mb-1 text-base text-[#a1a1aa] 4xl:text-lg">Posts</p>
              <strong className="text-base text-white 4xl:text-lg">500</strong>
            </div>
            <div className="">
              <p className="mb-1 text-base text-[#a1a1aa] 4xl:text-lg">
                Address
              </p>
              <strong className="flex items-center gap-2 text-base text-white 4xl:text-lg">
                0xFc3…7cx1
                <div className="cursor-pointer">
                  <Copy />
                </div>
              </strong>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white md:text-base xl:text-[15px] 2xl:text-base 4xl:text-lg">
            A collection of NFTs featuring lines created using a variety of
            different media, technologies, and techniques.
          </p>
        </div>
      </div>
      <div className="border-b-2 border-[#2D2D32] py-4 md:py-5 xl:py-6 4xl:py-8">
        <PageNavigation menus={["nfts", "Activity"]} buttonLabel="Create " />
      </div>
      <div className="mb-20 grid grid-cols-1 pt-6 md:grid-cols-[220px,1fr] md:gap-4 lg:gap-6 xl:mb-10 xl:grid-cols-[270px,1fr] xl:gap-8 3xl:gap-10 3xl:pt-8">
        <MarketPlaceSidebar drawer={drawer} setDrawer={setDrawer} />
        <div className="">
          {query === "nfts" && <Nfts setDrawer={setDrawer} />}
          {query === "activity" && <Activity setDrawer={setDrawer} />}
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
                  Recently Created
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
              <div key={i} className="basis-[31%]">
                <NFTcard />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

const Activity = ({ setDrawer }) => {
  return (
    <>
      <div
        onClick={() => setDrawer(true)}
        className="mb-3 flex max-w-max items-center rounded-lg bg-blue-gray p-4 text-white md:hidden"
      >
        <Menu />
      </div>
      <div className="overflow-hidden rounded-xl bg-slate-gray">
        <ScrollArea className="h-full overflow-auto p-0 md:h-screen">
          {new Array(15).fill(true).map((_, i) => (
            <ActivityCard key={i} />
          ))}
        </ScrollArea>
      </div>
    </>
  );
};
const ActivityCard = () => {
  return (
    <div className="border-b-2 border-[#2D2D32] bg-slate-gray px-4 py-4 xl:px-7 xl:py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 p-0 xl:gap-5">
          <Image
            src={ASSETS.DOG}
            alt="Camera"
            className="h-12 w-12 rounded-full object-contain"
          />
          <div className="flex flex-col gap-1">
            <p className="cursor-pointer text-sm font-semibold text-white md:text-[15px] 4xl:text-base">
              Analog Lines
            </p>
            <p className="mt-1 text-sm font-normal text-white md:text-[15px] 4xl:mt-2 4xl:text-base">
              <span className="text-[#a1a1aa]">Listed By</span> Woof
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex items-center justify-end gap-2 text-sm text-white md:text-[15px] xl:text-base">
            0.1 ETH <ExternalLink />
          </p>
          <p className="text-xs font-normal text-[#a1a1aa] md:text-sm">
            Mar 20, 2024 11:43
          </p>
        </div>
      </div>
    </div>
  );
};

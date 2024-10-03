"use client";

import Image from "next/image";
import { ASSETS } from "@/assets";
import { ExternalLink } from "lucide-react";

import { CTAButton, Dropdown, OutlineButton } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function MarketPlaceSlug() {
  return (
    <div className="mb-20 block gap-4 md:grid md:grid-cols-2 lg:grid-cols-[450px,1fr] lg:gap-5 xl:mb-10 xl:grid-cols-[570px,1fr] 2xl:gap-7 4xl:gap-9">
      <LeftSide />
      <RightSide />
    </div>
  );
}

const LeftSide = () => {
  return (
    <div>
      <div className="h-[300px] w-full overflow-hidden rounded-xl 2xl:h-[400px] 4xl:h-[480px]">
        <Image
          src={ASSETS.NFT}
          alt="nft"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="my-3 rounded-2xl border-none bg-slate-gray p-5 sm:my-4 sm:p-6 lg:my-6 2xl:my-8 2xl:p-7 3xl:p-8 4xl:my-10 4xl:p-9">
        <div className="flex-row items-center gap-3 p-0 xl:gap-5">
          <h2 className="cursor-pointer text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
            Description
          </h2>
          <p className="mt-5 flex items-center gap-2 text-sm font-normal text-white md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
            Created by using long exposure on an old Minolta film camera with a
            telephoto lens.
          </p>
        </div>
      </div>

      <div className="my-3 rounded-2xl border-none bg-slate-gray p-5 sm:my-4 sm:p-6 lg:my-6 2xl:my-8 2xl:p-7 3xl:p-8 4xl:my-10 4xl:p-9">
        <div className="flex-row items-center gap-3 p-0 xl:gap-5">
          <h2 className="cursor-pointer text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
            Details
          </h2>
          <ul>
            <li className="mt-5 flex items-center justify-between gap-2 text-sm font-normal text-white md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
              <span className="text-[#a1a1aa]">Contract Address</span>
              <span className="flex items-center gap-2">
                0xEcC43D…49C3 <ExternalLink />
              </span>
            </li>
            <li className="mt-5 flex items-center justify-between gap-2 text-sm font-normal text-white md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
              <span className="text-[#a1a1aa]">Token Id</span>
              <span className="flex items-center gap-2">8327703</span>
            </li>
            <li className="mt-5 flex items-center justify-between gap-2 text-sm font-normal text-white md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
              <span className="text-[#a1a1aa]">Blockchain</span>
              <span className="flex items-center gap-2">
                <div className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </div>
                Polygon
              </span>
            </li>
            <li className="mt-5 flex items-center justify-between gap-2 text-sm font-normal text-white md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
              <span className="text-[#a1a1aa]">Token Standard</span>
              <span className="flex items-center gap-2">ERC-721</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const RightSide = () => {
  return (
    <div>
      <h3 className="mb-0 text-xl font-semibold text-white lg:text-2xl 3xl:text-3xl">
        Analog Lines
      </h3>
      <div className="flex items-center justify-between border-b-2 border-[#2D2D32]">
        <div className="my-6 flex gap-5 md:gap-10 2xl:my-8 4xl:my-10">
          <div className="flex items-center gap-3 p-0 xl:gap-5">
            <div className="h-12 w-12">
              <Image
                src={ASSETS.NFT}
                alt="Camera"
                className="w-full rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[15px] text-[#a1a1aa] sm:mb-1 4xl:text-base">
                Collections
              </p>
              <Link href={`/marketplace/collections/lines?type=nfts`}>
                <h4 className="cursor-pointer text-sm font-semibold text-white hover:underline sm:text-[15px] 4xl:text-base">
                  Lines
                </h4>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 p-0 xl:gap-5">
            <div className="h-12 w-12">
              <Image
                src={ASSETS.DOG}
                alt="Camera"
                className="w-full rounded-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[15px] text-[#a1a1aa] sm:mb-1 4xl:text-base">
                Owner
              </p>
              <h4 className="cursor-pointer text-sm font-semibold text-white hover:underline sm:text-[15px] 4xl:text-base">
                Woof
              </h4>
            </div>
          </div>
        </div>
        <Dropdown
          dropdownMenu={[
            {
              name: "view",
              link: "/marketplace/collections/lines?type=nfts",
            },
          ]}
          contentClass={"xl:!right-16"}
        />
      </div>
      <div className="my-3 flex flex-col items-start justify-between gap-y-5 rounded-xl bg-slate-gray p-4 sm:my-4 sm:p-5 lg:my-6 2xl:my-8 2xl:flex-row 2xl:items-center 2xl:p-7 4xl:my-10">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[#a1a1aa] lg:text-[15px] 3xl:text-base">
            Price
          </p>
          <h2 className="text-lg font-semibold text-white xl:text-xl 3xl:text-2xl">
            0.1 ETH
          </h2>
          <p className="text-sm text-[#a1a1aa] lg:text-[15px] 3xl:text-base">
            $200
          </p>
        </div>
        <div className="flex gap-5">
          <OutlineButton>Make Offer</OutlineButton>
          <CTAButton>Buy Now</CTAButton>
        </div>
      </div>
      <div className="rounded-xl bg-slate-gray py-4 sm:py-5 3xl:py-7">
        <h2 className="cursor-pointer px-7 text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
          Activity
        </h2>
        <div className="mt-7">
          <ScrollArea className="h-full overflow-auto p-0 md:h-screen">
            {new Array(15).fill(true).map((_, i) => (
              <TransactionCard key={i} />
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

const TransactionCard = () => {
  return (
    <div className="border-b-2 border-[#2D2D32] bg-slate-gray px-2 py-4 sm:px-4 xl:px-7 xl:py-5">
      <div className="flex flex-wrap items-center justify-between gap-y-3">
        <div className="flex items-center gap-3 p-0 xl:gap-5">
          <Image
            src={ASSETS.DOG}
            alt="Camera"
            className="h-12 w-12 rounded-full object-contain"
          />
          <div className="flex flex-col gap-1">
            <p className="cursor-pointer text-sm font-semibold text-white md:text-[15px] 4xl:text-base">
              <span className="text-[#a1a1aa]">Listed By</span> Woof
            </p>
            <p className="mt-1 text-xs font-normal text-[#a1a1aa] sm:text-sm md:text-[15px] 4xl:mt-2 4xl:text-base">
              Created Nov 20, 2023
            </p>
          </div>
        </div>
        <p className="flex items-center gap-2 text-sm text-white md:text-[15px] 3xl:text-base">
          0.1 ETH <ExternalLink />
        </p>
      </div>
    </div>
  );
};

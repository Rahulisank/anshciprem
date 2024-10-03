import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { ASSETS } from "@/assets";

const CollectionCard = () => {
  return (
    <div className="rounded-2xl bg-none from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[2px] transition-all hover:bg-gradient-to-r">
      <Card className="rounded-2xl border-none bg-slate-gray p-5 outline-none sm:p-6 2xl:p-7 3xl:p-8 4xl:p-9">
        <CardContent className="flex flex-col gap-4 p-0 sm:gap-5 xl:gap-6">
          {/* <Link href={"/groups/photography?type=posts"}> */}
          <CardHeader className="flex-row items-center gap-3 p-0 xl:gap-5">
            <div className="w-16 xl:w-20">
              <Image
                src={ASSETS.NFT}
                alt="Camera"
                className="w-full rounded-xl object-cover"
              />
            </div>
            <div className="">
              <CardTitle className="cursor-pointer text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
                Lines
              </CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2 text-sm font-normal text-[#a1a1aa] md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
                <span className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </span>
                <span>Polygon</span>
              </CardDescription>
            </div>
          </CardHeader>
          {/* </Link> */}
          <div className="flex justify-between sm:justify-normal sm:gap-24">
            {/* Members statistics */}
            <div className="">
              <p className="text-base text-[#a1a1aa] sm:mb-1 4xl:text-lg">
                Listed NFTs
              </p>
              <strong className="text-[15px] text-white sm:text-base 4xl:text-lg">
                200
              </strong>
            </div>

            {/* Posts statistics */}
            <div className="">
              <p className="text-base text-[#a1a1aa] sm:mb-1 4xl:text-lg">
                Volume
              </p>
              <strong className="text-[15px] text-white sm:text-base 4xl:text-lg">
                5 ETH
              </strong>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionCard;

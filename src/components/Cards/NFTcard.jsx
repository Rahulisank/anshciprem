import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

import { ASSETS } from "@/assets";

const NFTcard = () => {
  return (
    <div className="rounded-2xl bg-none from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[2px] transition-all hover:bg-gradient-to-r">
      <Card className="overflow-hidden rounded-xl border-none bg-slate-gray">
        <CardContent className="p-0">
          <div className="h-60 w-full xl:h-72">
            <Image
              src={ASSETS.NFT}
              alt="nft"
              className="h-full w-full object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1 px-5 py-3 md:px-6 md:py-4 4xl:px-8 4xl:py-5">
          {/*  px-8 py-5 */}
          <CardTitle className="text-base tracking-[0.5px] text-white md:text-lg 4xl:text-xl">
            Analog Lines
          </CardTitle>
          <CardDescription className="flex flex-row gap-2">
            <Image src={ASSETS.POLYGOM} alt="polygon" />
            <span className="text-sm tracking-[1px] text-white md:text-[15px] 4xl:text-base">
              0.1 Eth
            </span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NFTcard;

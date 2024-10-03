"use client";
import { ASSETS } from "@/assets";

import Image from "next/image";
import Link from "next/link";

export default function Chat() {
  return (
    <div className="xl:hidden">
      <div className={"border-b-[1px] border-blue-gray"}>
        <div className="pb-4 lg:pb-5">
          <h2 className="text-base text-white md:text-lg lg:text-xl">
            Messages
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <AllChats />
      </div>
    </div>
  );
}

const AllChats = () => {
  return (
    <div className="border-blue-gray">
      {new Array(2).fill(true).map((_, i) => {
        return (
          <Link key={i} href={"/chat/user"}>
            <div className="cursor-pointer border-b-[1px] border-blue-gray p-3 hover:bg-blue-gray md:p-4 lg:p-5">
              <div className="flex items-center gap-3">
                <Image
                  src={ASSETS.USER_IMAGE}
                  alt="user"
                  className="h-9 w-9 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-[15px] text-white 3xl:text-base">Pi</p>
                  <p className="text-[13px] text-[#a1a1aa]">
                    Me: Hey, what’s up?{" "}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

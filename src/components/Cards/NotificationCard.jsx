import { ASSETS } from "@/assets";
import Image from "next/image";
import React from "react";

const NotificationCard = () => {
  return (
    <div className="cursor-pointer border-b-2 border-[#2d2d32] p-3 hover:bg-slate-gray md:p-4 xl:p-3 3xl:p-5">
      <div className="flex items-center gap-3">
        <Image src={ASSETS.DOG} alt="user" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <p className="mb-1 text-[15px] text-white">
            Photography
            <span className="text-sm text-[#a1a1aa]"> • 1 hour ago</span>
          </p>
          <p className="text-sm text-[#a1a1aa]">
            {"10 upvotes to on comment:Wow Thats really cool. Love it :D"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { OutlineButton } from "..";

const JoinGroups = () => {
  return (
    <>
      <Card className="rounded-2xl border-none bg-transparent p-5 outline-none sm:p-6 xl:bg-slate-gray 2xl:p-7 3xl:p-8 4xl:p-9">
        <CardHeader className="p-0">
          <CardTitle className="mb-5 text-lg text-white md:mb-7 3xl:text-xl 4xl:mb-9 4xl:text-2xl">
            Groups For You
          </CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-y-5 md:gap-y-6 3xl:gap-y-8 4xl:gap-y-10">
          {new Array(4).fill(0).map((_, i) => {
            return (
              <CardContent
                key={i}
                className="flex items-center justify-between p-0"
              >
                {/* User image section with profile picture overlay */}
                <div className="flex items-center gap-4 3xl:gap-6">
                  <div className="relative w-full max-w-14">
                    <Image
                      src={require("@/assets/images/camera_img.png")}
                      alt="Camera"
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="cursor-pointer text-base font-semibold text-white hover:underline 3xl:text-lg 4xl:text-[19px]">
                      Photography
                    </h4>
                    <p className="text-sm text-[#a1a1aa] 2xl:text-[15px] 4xl:text-base">
                      30.3k Members
                    </p>
                  </div>
                </div>
                <div className="">
                  <OutlineButton>Join</OutlineButton>
                </div>
              </CardContent>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default JoinGroups;

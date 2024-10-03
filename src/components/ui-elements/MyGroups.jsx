import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { CreateGroup, OutlineButton } from "..";
import { useDispatch } from "react-redux";
import { updateModalState } from "@/redux/slices/ModalSlice";

const MyGroups = () => {
  const dispatch = useDispatch();
  return (
    <Card className="rounded-2xl border-none bg-transparent p-5 outline-none xl:bg-slate-gray xl:p-6 2xl:p-7 3xl:p-8 4xl:p-9">
      <CardHeader className="p-0">
        <CardTitle className="mb-5 text-lg text-white md:mb-7 3xl:text-xl 4xl:mb-9 4xl:text-2xl">
          My Top Groups
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-y-5 md:gap-y-6 3xl:gap-y-8 4xl:gap-y-10">
        {new Array(4).fill(0).map((_, i) => {
          return (
            <Link key={i} href={"/explore/category/photography?type=trending"}>
              <CardContent className="flex cursor-pointer items-center gap-4 p-0 3xl:gap-6">
                {/* User image section with profile picture overlay */}
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
              </CardContent>
            </Link>
          );
        })}
      </div>
      <CardFooter className="px-0 pb-0 pt-6 4xl:pt-10">
        <OutlineButton
          onClick={() => dispatch(updateModalState("openCreateGroupModal"))}
          className={"w-full"}
        >
          Create Group
        </OutlineButton>
      </CardFooter>
      <CreateGroup />
    </Card>
  );
};

export default MyGroups;

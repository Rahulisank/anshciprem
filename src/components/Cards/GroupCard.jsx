import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { useToken } from "@/lib/useToken";
import { useLeaveGroupMutation } from "@/redux/api";
import { ButtonLoader } from "../loader/ButtonLoader";
import { useToast } from "@/hooks/use-toast";

const GroupCard = (props) => {
  const { getToken } = useToken();

  const userId = getToken();

  const { toast } = useToast();

  const leaveGroup = useLeaveGroupMutation();

  const handleLeaveGroup = async (id) => {
    const response = await leaveGroup[0]({
      userid: userId,
      groupid: id,
    });
    if (response?.data?.success) {
      toast({
        title: response?.data?.message
          ? response?.data?.message
          : "Group Leaved successfully",
      });
    }
    if (leaveGroup[1]?.isError) {
      toast({
        variant: "destructive",
        title: response?.error?.data?.message
          ? response?.error?.data?.message
          : "Something went wrong! Please try again later",
      });
    }
  };
  return (
    <div className="rounded-2xl bg-none from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[2px] transition-all hover:bg-gradient-to-r">
      <Card className="rounded-2xl border-none bg-slate-gray p-5 outline-none sm:p-6 2xl:p-7 3xl:p-8 4xl:p-9">
        <CardContent className="flex flex-col gap-4 p-0 sm:gap-5 xl:gap-6">
          <Link
            href={`/groups/${props?.group?.joinedon ? props?.group?.groupid : props?.group?.id}?type=posts`}
          >
            <CardHeader className="flex-row items-center gap-3 p-0 xl:gap-5">
              <div className="w-16 xl:w-20">
                <img
                  src={`${props?.group.groupimage}`}
                  alt="Camera"
                  className="h-20 w-20 rounded-xl object-cover"
                />
              </div>
              <div className="">
                <CardTitle className="cursor-pointer text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
                  {props?.group.groupname}
                </CardTitle>
                <CardDescription className="mt-1 text-sm font-normal text-[#a1a1aa] md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
                  Created{" "}
                  {dayjs(props?.group.created_at)
                    .format("MMM-DD-YYYY")
                    .replaceAll("-", " ")}
                </CardDescription>
              </div>
            </CardHeader>
          </Link>
          <div className="flex justify-between sm:justify-normal sm:gap-24">
            {/* Members statistics */}
            <div className="">
              <p className="text-base text-[#a1a1aa] sm:mb-1 4xl:text-lg">
                Members
              </p>
              <strong className="text-[15px] text-white sm:text-base 4xl:text-lg">
                {props?.group.members}
              </strong>
            </div>

            {/* Posts statistics */}
            <div className="">
              <p className="text-base text-[#a1a1aa] sm:mb-1 4xl:text-lg">
                Posts
              </p>
              <strong className="text-[15px] text-white sm:text-base 4xl:text-lg">
                {props?.group.posts}
              </strong>
            </div>
          </div>
          <CardFooter className="p-0">
            {props?.group?.joinedon && (
              <Button
                variant="outline"
                className="w-full rounded-full border-2 bg-transparent text-sm font-semibold !text-white hover:bg-dark-gray sm:text-base 3xl:py-6 4xl:text-lg"
                onClick={() => handleLeaveGroup(props?.group?.groupid)}
              >
                {leaveGroup[1]?.isLoading ? (
                  <div className="flex justify-center">
                    Leave <ButtonLoader />
                  </div>
                ) : (
                  "Leave"
                )}
              </Button>
            )}

            {props?.showDetailsButton && (
              <Link
                href={`/groups/${props?.group?.id}?type=posts`}
                variant="outline"
                className="w-full rounded-full border-2 bg-transparent py-2 text-center text-sm font-semibold !text-white hover:bg-dark-gray sm:text-base 3xl:py-6 4xl:text-lg"
              >
                Details
              </Link>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupCard;

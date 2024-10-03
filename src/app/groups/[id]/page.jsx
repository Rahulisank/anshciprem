"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  CreateGroup,
  CTAButton,
  Dropdown,
  JoinGroups,
  Moderators,
  NFTcard,
  OutlineButton,
  PageNavigation,
  PostCard,
} from "@/components";
import Sidebar from "@/app/explore/Sidebar";

import { allPosts } from "@/mock/Posts";
import {
  useDeleteGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useSingleGroupQuery,
} from "@/redux/api";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateModalState } from "@/redux/slices/ModalSlice";
import { useRouter } from "next/navigation";
import { ButtonLoader } from "@/components/loader/ButtonLoader";

export default function GroupPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const queryParams = useSearchParams();
  const query = queryParams.get("type");
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const userId = useSelector((state) => state.AuthSlice.userId);

  const [joinGoup, { isLoading, isError }] = useJoinGroupMutation();

  const deleteGroup = useDeleteGroupMutation();

  const singleGroupDetails = useSingleGroupQuery(
    { id, userid: userId },
    { skip: !userId },
  );

  const leaveGroup = useLeaveGroupMutation();

  const handleJoinGroup = async (id) => {
    const response = await joinGoup({
      userid: userId,
      groupid: id,
    });
    if (response?.data?.success) {
      toast({
        title: response?.data?.message
          ? response?.data?.message
          : "Group joined successfully",
      });
    }
    if (isError) {
      toast({
        variant: "destructive",
        title: response?.error?.data?.message
          ? response?.error?.data?.message
          : "Something went wrong! Please try again later",
      });
    }
  };

  const handleDeleteGroup = async (id) => {
    const response = await deleteGroup[0]({ groupId: id });
    if (response?.data?.success) {
      toast({
        title: response?.data?.message
          ? response?.data?.message
          : "Group Deleted successfully",
      });
      router.push("/groups?type=my-groups");
    }
    if (deleteGroup[1]?.isError) {
      toast({
        variant: "destructive",
        title: response?.error?.data?.message
          ? response?.error?.data?.message
          : "Something went wrong! Please try again later",
      });
    }
  };

  const handleLeaveGroup = async () => {
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
    <>
      {singleGroupDetails?.isLoading ? (
        <div className="flex h-[70vh] w-full items-center justify-center bg-[#18181b]">
          <ButtonLoader />
        </div>
      ) : (
        <>
          {/* Container for the top section */}
          <section className="flex flex-col justify-between gap-y-5 border-b-[1px] border-slate-gray pb-5 md:pb-8 xl:flex-row 3xl:pb-10 4xl:pb-12">
            <div className="flex gap-2 sm:gap-3 md:gap-5 xl:w-1/2 2xl:w-2/5">
              <div className="!w-24 overflow-hidden xl:!w-44">
                <img
                  src={
                    singleGroupDetails?.data?.group &&
                    singleGroupDetails?.data?.group?.groupimage
                  }
                  alt="Camera"
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>

              {/* Description section */}
              <div className="flex w-full items-center justify-between px-4 xl:block">
                <Link href={"#"}>
                  <h3 className="text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
                    {singleGroupDetails?.data?.group &&
                      singleGroupDetails?.data?.group?.groupname}
                  </h3>
                  <p className="mt-1 text-sm font-normal text-[#a1a1aa] md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
                    Created{" "}
                    {singleGroupDetails?.data?.group &&
                      dayjs(singleGroupDetails?.data?.group?.created_at)
                        .format("MMM-DD-YYYY")
                        .replaceAll("-", " ")}
                  </p>
                </Link>
                <div className="flex items-center gap-4 xl:mt-4 4xl:mt-6">
                  {/* Join button */}
                  {singleGroupDetails?.data?.group?.userid !==
                    Number.parseInt(userId) && (
                    <OutlineButton className={cn("hidden sm:flex")}>
                      Message
                    </OutlineButton>
                  )}

                  {singleGroupDetails?.data?.group?.userid !==
                    Number.parseInt(userId) &&
                    !singleGroupDetails?.data?.group?.joinedon && (
                      <CTAButton
                        onClick={() =>
                          handleJoinGroup(
                            singleGroupDetails?.data?.group &&
                              singleGroupDetails?.data?.group?.id,
                          )
                        }
                        extra="hidden sm:flex py-5 px-4 rounded-full  md:px-8 font-semibold border-2 border-shiny-blue"
                      >
                        {isLoading ? (
                          <div className="flex justify-center">
                            Follow <ButtonLoader />
                          </div>
                        ) : (
                          "Follow"
                        )}
                      </CTAButton>
                    )}
                  {singleGroupDetails?.data?.group?.joinedon && (
                    <OutlineButton
                      onClick={handleLeaveGroup}
                      className={cn("hidden sm:flex")}
                    >
                      {leaveGroup[1]?.isLoading ? (
                        <div className="flex justify-center">
                          Leave <ButtonLoader />
                        </div>
                      ) : (
                        "Leave"
                      )}
                    </OutlineButton>
                  )}
                  {singleGroupDetails?.data?.group?.userid ===
                    Number.parseInt(userId) && (
                    <Dropdown
                      dropdownMenu={[
                        {
                          name: "Edit",
                          onClick: () =>
                            dispatch(updateModalState("openCreateGroupModal")),
                        },
                        {
                          name: "Delete",
                          onClick: () =>
                            handleDeleteGroup(
                              singleGroupDetails?.data?.group?.id,
                            ),
                        },
                      ]}
                      contentClass={"xl:!left-24"}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <OutlineButton className={cn("flex max-w-fit sm:hidden")}>
                Message
              </OutlineButton>
              <CTAButton
                onClick={() =>
                  handleJoinGroup(
                    singleGroupDetails?.data?.group &&
                      singleGroupDetails?.data?.group?.id,
                  )
                }
                extra=" sm:hidden py-5 px-8 rounded-full  font-semibold border-2 border-shiny-blue"
              >
                Follow
              </CTAButton>
            </div>
            {/* Right side: Statistics and description */}
            <div className="xl:w-1/2 2xl:w-3/5">
              <div className="mb-4 flex gap-24">
                <div className="">
                  <p className="mb-1 text-base text-[#a1a1aa] 4xl:text-lg">
                    Followers
                  </p>
                  <strong className="text-base text-white 4xl:text-lg">
                    {" "}
                    {singleGroupDetails?.data?.group &&
                      singleGroupDetails?.data?.group?.members}
                  </strong>
                </div>

                <div className="">
                  <p className="mb-1 text-base text-[#a1a1aa] 4xl:text-lg">
                    Posts
                  </p>
                  <strong className="text-base text-white 4xl:text-lg">
                    {singleGroupDetails?.data?.group &&
                      singleGroupDetails?.data?.group?.posts}
                  </strong>
                </div>
              </div>
              <p className="text-sm text-white md:text-base xl:text-[15px] 2xl:text-base 4xl:text-lg">
                {singleGroupDetails?.data?.group &&
                  singleGroupDetails?.data?.group?.description}
              </p>
            </div>
          </section>

          {/* container for the post section and moderators sections */}
          <div className="pt-4 lg:pt-6 2xl:pt-8">
            <div className="mb-24 grid grid-cols-1 gap-5 xl:mb-10 xl:grid-cols-[2fr,1fr] 2xl:gap-7 4xl:gap-10">
              {/* container for the posts */}
              <div className="">
                <PageNavigation
                  menus={["Posts", "Experiences", "NFTs"]}
                  onButtonClick={() => {
                    // dispatch(updateModalState("openCreatePostModal"));
                  }}
                  activeDrawer={() => setOpenDrawer(true)}
                />
                {query === "posts" && (
                  <div className="mt-5 flex flex-col gap-6 xl:mt-5 2xl:mt-7 3xl:mt-10 3xl:gap-8">
                    {allPosts?.map((posts) => (
                      <PostCard posts={posts} key={posts?.id} />
                    ))}
                  </div>
                )}

                {query === "experiences" && (
                  <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:mt-5 xl:grid-cols-2 2xl:mt-7 2xl:grid-cols-3 3xl:mt-10 3xl:gap-8">
                    {new Array(3).fill(true)?.map((_, i) => (
                      <div key={i} className="basis-[31%]">
                        <NFTcard />
                      </div>
                    ))}
                  </div>
                )}

                {query === "nfts" && (
                  <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:mt-5 xl:grid-cols-2 2xl:mt-7 2xl:grid-cols-3 3xl:mt-10 3xl:gap-8">
                    {new Array(5).fill(true)?.map((_, i) => (
                      <div key={i} className="basis-[31%]">
                        <NFTcard />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* container for the moderators and groups */}

              <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
                <JoinGroups />
                <div className="xl:mt-5 2xl:mt-7 3xl:mt-9">
                  <Moderators />
                </div>
              </Sidebar>
            </div>
            {/* container for the moderators and groups */}
          </div>
          <CreateGroup
            heading="Edit Group"
            groupDetails={singleGroupDetails?.data?.group}
          />
        </>
      )}
    </>
  );
}

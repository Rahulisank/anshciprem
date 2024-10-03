"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  CreatePost,
  Dropdown,
  JoinGroups,
  Moderators,
  OutlineButton,
  PageNavigation,
  PostCard,
} from "@/components";
import Sidebar from "../../Sidebar";
import { updateModalState } from "@/redux/slices/ModalSlice";

import { allPosts } from "@/mock/Posts";

export default function ExploreCategory() {
  return (
    <>
      {/* Container for the top section */}
      <section className="flex flex-col justify-between gap-y-5 border-b-[1px] border-slate-gray pb-5 md:pb-8 xl:flex-row 3xl:pb-10 4xl:pb-12">
        {/* Left side: Image and brief description */}
        <div className="flex gap-2 sm:gap-3 md:gap-5 xl:w-2/6">
          {/* Image container with fixed size */}
          <div className="overflow-hidden">
            <Image
              src={require("@/assets/images/camera_img.png")}
              alt="Camera"
              className="!w-24 rounded-xl object-cover xl:!w-44"
            />
          </div>

          {/* Description section */}
          <div className="flex w-full items-center justify-between px-4 xl:block">
            <div>
              <h3 className="text-base font-semibold text-white sm:text-lg 4xl:text-xl">
                Photography
              </h3>
              <p className="mt-1 text-sm font-normal text-[#a1a1aa] sm:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
                Created Nov 20, 2023
              </p>
            </div>
            <div className="flex items-center gap-4 xl:mt-4 4xl:mt-6">
              {/* Join button */}

              <OutlineButton className={"hidden sm:flex"}>Join</OutlineButton>

              <Dropdown
                dropdownMenu={[{ name: "view", link: "/explore/detail" }]}
                contentClass={"xl:!left-24"}
              />
            </div>
          </div>
        </div>

        <OutlineButton className={"flex max-w-fit sm:hidden"}>
          Join
        </OutlineButton>

        {/* Right side: Statistics and description */}
        <div className="xl:w-4/6">
          <div className="mb-4 flex gap-24">
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
          </div>

          {/* Description */}
          <p className="text-sm text-white md:text-base xl:text-[15px] 2xl:text-base 4xl:text-lg">
            {`A place to discuss the tools, techniques, and culture of photography. Whether it\u2019s a bit of homemade gear, a trick for getting a good group shot, or that special addition to your workflow, post it up here for the rest of us to learn!`}
          </p>
        </div>
      </section>
      {/* container for the post section and moderators sections */}
      <div className="pt-4 lg:pt-6 2xl:pt-8">
        <PostSection />
      </div>
      {/* create post */}
      <CreatePost />
    </>
  );
}

const PostSection = () => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="mb-20 grid grid-cols-1 gap-5 xl:mb-10 xl:grid-cols-[2fr,1fr] 2xl:gap-7 4xl:gap-10">
      {/* container for the posts */}
      <div className="">
        <PageNavigation
          menus={["trending", "new"]}
          onButtonClick={() => {
            dispatch(updateModalState("openCreatePostModal"));
          }}
          buttonLabel="Create Post"
          activeDrawer={() => setOpenDrawer(true)}
        />
        <div className="mt-5 flex flex-col gap-6 xl:mt-5 2xl:mt-7 3xl:mt-10 3xl:gap-8">
          {allPosts?.map((posts) => (
            <PostCard posts={posts} key={posts?.id} />
          ))}
        </div>
      </div>
      {/* container for the moderators and groups */}

      <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
        <Moderators />
        <div className="xl:mt-5 2xl:mt-7 3xl:mt-9">
          <JoinGroups />
        </div>
      </Sidebar>
    </div>
  );
};

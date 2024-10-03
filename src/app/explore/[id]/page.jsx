"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../Sidebar";

import {
  CTAButton,
  TrendingPosts,
  Moderators,
  PostCard,
  CreatePost,
} from "@/components";

import { useParams } from "next/navigation";
import { useSinglePostQuery } from "@/redux/api";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";

export default function Explore() {
  const { id } = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  const getSinglePosts = useSinglePostQuery({ id }, { skip: !id });

  return (
    <>
      {/* container for the post section and moderators sections */}
      <div className="mb-20 grid grid-cols-1 gap-5 xl:mb-10 xl:grid-cols-[2fr,1fr] 2xl:gap-7 4xl:gap-10">
        {/* container for the posts */}
        <div className="flex justify-end pb-1 sm:pb-2 md:pb-3 xl:hidden">
          <CTAButton onClick={() => setOpenDrawer(true)}>
            <Menu />
          </CTAButton>
        </div>
        <div className="w-full">
          {getSinglePosts?.isLoading ? (
            <CardSkeleton />
          ) : (
            <PostCard posts={getSinglePosts?.data?.post} id={id} />
          )}
        </div>
        {/* container for the moderators and groups */}
        <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          <Moderators />
          <div className="xl:mt-5 2xl:mt-7 3xl:mt-9">
            <TrendingPosts />
          </div>
        </Sidebar>
        <CreatePost
          postId={id}
          posts={getSinglePosts?.data?.post}
          heading="Edit Post"
        />
      </div>
    </>
  );
}

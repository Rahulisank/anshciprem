"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CreatePost,
  JoinGroups,
  MyGroups,
  NFTcard,
  PageNavigation,
  PostCard,
} from "@/components";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Sidebar from "./Sidebar";

import { updateModalState } from "@/redux/slices/ModalSlice";
import {
  useAllPostsQuery,
  useMyPostsQuery,
  useTrendingPostsQuery,
} from "@/redux/api";
import { useSearchParams } from "next/navigation";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";

function HomeContent() {
  const dispatch = useDispatch();
  const queryParams = useSearchParams();
  const query = queryParams.get("type");
  const userId = useSelector((state) => state.AuthSlice.userId);

  const [openDrawer, setOpenDrawer] = useState(false);

  const getAllPosts = useAllPostsQuery(1, { skip: query !== "new" });

  const myCreatedPosts = useMyPostsQuery(
    { userid: userId },

    {
      skip: !query || query !== "my-posts" || !userId,
    },
  );

  const getAllTrendingPosts = useTrendingPostsQuery(
    { userid: userId },
    {
      skip: !query || query !== "trending" || !userId,
    },
  );

  return (
    <>
      {/* container for the post section and moderators sections */}

      <div className="mb-20 grid grid-cols-1 gap-5 xl:mb-10 xl:grid-cols-[2fr,1fr] 2xl:gap-7 4xl:gap-10">
        {/* container for the posts */}
        <div className="">
          <PageNavigation
            menus={["new", "trending", "my posts"]}
            onButtonClick={() => {
              dispatch(updateModalState("openCreatePostModal"));
            }}
            buttonLabel="Create Post"
            activeDrawer={() => setOpenDrawer(true)}
          />

          <div className="mt-5 flex flex-col gap-6 xl:mt-5 2xl:mt-7 3xl:mt-10 3xl:gap-8">
            {getAllPosts?.isLoading ||
            getAllTrendingPosts?.isLoading ||
            myCreatedPosts?.isLoading ? (
              <>
                <div className="flex flex-col gap-2">
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              </>
            ) : null}
            {query === "new" &&
              getAllPosts?.data?.posts?.map((posts) => (
                <PostCard posts={posts} key={posts?.id} />
              ))}
            {query === "trending" &&
              getAllTrendingPosts?.data?.posts?.map((posts) => (
                <PostCard posts={posts} key={posts?.id} />
              ))}
            {query === "my-posts" &&
              myCreatedPosts?.data?.posts?.map((posts) => (
                <PostCard posts={posts} key={posts?.id} />
              ))}
          </div>
          {/* Nfts */}
          <div className="my-4 flex justify-between md:my-6 2xl:my-8">
            <h3 className="text-base text-white md:text-lg xl:text-xl 3xl:text-[22px]">
              Trending NFTs - Art
            </h3>
            <Link
              href="/nft"
              className="text-sm text-shiny-blue xl:text-base 3xl:text-lg"
            >
              View NFTs
            </Link>
          </div>
          <Carousel>
            <CarouselContent className="gap-2">
              {new Array(5).fill(true).map((_, i) => {
                return (
                  <CarouselItem
                    key={i}
                    className="basis-1/1 text-white lg:basis-1/4 xl:basis-1/3 4xl:basis-1/4"
                  >
                    <NFTcard />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        {/* container for the moderators and groups */}
        {/*  */}

        <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          <MyGroups />
          <div className="xl:mt-5 2xl:mt-7 3xl:mt-9">
            <JoinGroups />
          </div>
        </Sidebar>
      </div>

      <CreatePost />
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Suspense fallback={<div>Loading groups...</div>}>
      {mounted && <HomeContent />}
    </Suspense>
  );
}

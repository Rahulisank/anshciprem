"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

const TrendingPosts = () => {
  return (
    <Card className="rounded-2xl border-none bg-transparent p-5 outline-none sm:p-6 xl:bg-slate-gray 2xl:p-7 3xl:p-8 4xl:p-9">
      <CardHeader className="p-0">
        <CardTitle className="mb-5 text-lg text-white md:mb-7 3xl:text-xl 4xl:mb-9 4xl:text-2xl">
          Photography - Trending Posts
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-y-5 3xl:gap-y-6">
        {new Array(4).fill(0).map((_, i) => {
          return (
            <Link key={i} href={"/explore/category/photo"}>
              <CardContent className="flex cursor-pointer items-center p-0">
                <div className="flex flex-col">
                  <h4 className="cursor-pointer text-base font-semibold text-white hover:underline 3xl:text-lg 4xl:text-[19px]">
                    Tunnel
                  </h4>
                  <p className="text-sm text-[#a1a1aa] 2xl:text-[15px] 4xl:text-base">
                    30 points 4 comments
                  </p>
                </div>
              </CardContent>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default TrendingPosts;

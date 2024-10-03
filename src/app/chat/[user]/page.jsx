"use client";

import Link from "next/link";
import Image from "next/image";

import { ASSETS } from "@/assets";
import { CustomInput, Dropdown } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal, X } from "lucide-react";

export default function MessageBox() {
  return (
    <div className="xl:hidden">
      <div className="flex items-center justify-between border-b-[1px] border-blue-gray pb-4 lg:pb-5">
        <p className="text-base text-white 3xl:text-lg">Pi</p>
        <div className="flex items-center gap-3">
          <Dropdown
            dropdownMenu={[{ name: "view", link: "/explore/detail" }]}
          />
          <Link
            className={
              "mt-0 max-w-min cursor-pointer justify-end border-none bg-transparent p-0 !text-white hover:bg-transparent"
            }
            href={"/chat"}
          >
            <X />
          </Link>
        </div>
      </div>
      <div className="relative mb-20">
        <ScrollArea className="h-screen">
          <div className="py-3 md:py-4 lg:py-5">
            <div className="mb-3 flex items-start gap-4">
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
              <div className="">
                <p className="text-sm text-[#a1a1aa] md:text-[15px]">
                  pi • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-slate-gray px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey!
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-start justify-end gap-4">
              <div className="">
                <p className="text-right text-sm text-[#a1a1aa] md:text-[15px]">
                  Me • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-[#234f4a] px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey, what’s up?
                </p>
              </div>
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </div>
            <div className="mb-3 flex items-start gap-4">
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
              <div className="">
                <p className="text-sm text-[#a1a1aa] md:text-[15px]">
                  pi • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-slate-gray px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey!
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-start justify-end gap-4">
              <div className="">
                <p className="text-right text-sm text-[#a1a1aa] md:text-[15px]">
                  Me • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-[#234f4a] px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey, what’s up?
                </p>
              </div>
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </div>
            <div className="mb-3 flex items-start gap-4">
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
              <div className="">
                <p className="text-sm text-[#a1a1aa] md:text-[15px]">
                  pi • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-slate-gray px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey!
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-start justify-end gap-4">
              <div className="">
                <p className="text-right text-sm text-[#a1a1aa] md:text-[15px]">
                  Me • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-[#234f4a] px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey, what’s up?
                </p>
              </div>
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </div>
            <div className="mb-3 flex items-start gap-4">
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
              <div className="">
                <p className="text-sm text-[#a1a1aa] md:text-[15px]">
                  pi • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-slate-gray px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey!
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-start justify-end gap-4">
              <div className="">
                <p className="text-right text-sm text-[#a1a1aa] md:text-[15px]">
                  Me • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-[#234f4a] px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey, what’s up?
                </p>
              </div>
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </div>
            <div className="mb-3 flex items-start gap-4">
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
              <div className="">
                <p className="text-sm text-[#a1a1aa] md:text-[15px]">
                  pi • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-slate-gray px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey!
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-start justify-end gap-4">
              <div className="">
                <p className="text-right text-sm text-[#a1a1aa] md:text-[15px]">
                  Me • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-[#234f4a] px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey, what’s up?
                </p>
              </div>
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </div>
            <div className="mb-3 flex items-start gap-4">
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
              <div className="">
                <p className="text-sm text-[#a1a1aa] md:text-[15px]">
                  pi • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-slate-gray px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey!
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-start justify-end gap-4">
              <div className="">
                <p className="text-right text-sm text-[#a1a1aa] md:text-[15px]">
                  Me • 1 hour ago
                </p>
                <p className="mt-2 w-max rounded-md bg-[#234f4a] px-4 py-3 text-sm text-white md:mt-3 md:text-[15px]">
                  Hey, what’s up?
                </p>
              </div>
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </div>
          </div>
        </ScrollArea>
        <div className="bg-dark-slate">
          <div className="relative flex w-full items-center justify-between gap-5 bg-dark-slate">
            <CustomInput
              placeholder="Text"
              className="w-full rounded-sm py-5 !text-sm"
            />
            <div className="text-white">
              <SendHorizontal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Suspense, useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { CreateGroup, CustomInput, PageNavigation } from "@/components";
import { SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
import SelectBox from "@/components/input/SelectBox";
import { ArrowUpDown, Search } from "lucide-react";
import GroupCard from "@/components/Cards/GroupCard";
import {
  useAllGroupQuery,
  useJoinedGroupsQuery,
  useMyGroupsQuery,
} from "@/redux/api";
import {
  updateGroupsState,
  updateJoinedGroupsState,
  updateMyGroupsState,
} from "@/redux/slices/GroupSlice";
import useHandleAuthenticationAndModal from "@/lib/not-authenticate";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";

function GroupContent() {
  const dispatch = useDispatch();
  const queryParams = useSearchParams();
  const handleAuthenticationAndModal = useHandleAuthenticationAndModal();
  const query = queryParams.get("type");

  const groupsSlice = useSelector((state) => state.GroupSlice);
  const userId = useSelector((state) => state.AuthSlice.userId);

  const getAllGroups = useAllGroupQuery(1, { skip: query !== "all" });

  const getAllJoinedGroups = useJoinedGroupsQuery(
    { userid: userId },
    {
      skip: !query || query !== "joined" || !userId,
    },
  );

  const myCreatedGroups = useMyGroupsQuery(
    { userid: userId },
    {
      skip: !query || query !== "my-groups" || !userId,
    },
  );

  useEffect(() => {
    if (getAllGroups?.data) {
      dispatch(updateGroupsState(getAllGroups?.data?.groups));
    }

    if (getAllJoinedGroups?.data) {
      dispatch(updateJoinedGroupsState(getAllJoinedGroups?.data?.joinedGroups));
    }

    if (myCreatedGroups?.data) {
      dispatch(updateMyGroupsState(myCreatedGroups?.data?.groups));
    }
  }, [getAllJoinedGroups?.data, myCreatedGroups?.data, getAllGroups?.data]);

  return (
    <>
      <PageNavigation
        menus={["All", "Joined", "My Groups"]}
        onButtonClick={() => {
          handleAuthenticationAndModal("openCreateGroupModal");
        }}
        buttonLabel="Create Group"
      />

      <div className="my-5 sm:my-7 3xl:my-9">
        <form className="mt-6 flex gap-4 md:max-w-full lg:max-w-[800px] xl:max-w-[1000px] xl:gap-6">
          <div className="w-max md:w-1/3 2xl:w-1/4">
            <SelectBox
              name="group"
              placeholder={
                <>
                  <span className="md:hidden">
                    <ArrowUpDown />
                  </span>
                  <span className="hidden md:block">Date Created</span>
                </>
              }
            >
              <SelectContent className="relative top-3 w-60 rounded-xl border-blue-gray bg-blue-gray py-4 text-white">
                <SelectItem
                  className="bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                  value="trending"
                >
                  Trending
                </SelectItem>
                <SelectItem
                  className="mt-4 bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                  value="most-members"
                >
                  Most Members
                </SelectItem>
              </SelectContent>
            </SelectBox>
          </div>
          <div className="relative w-full">
            <CustomInput
              name="searchGroups"
              placeholder="Search Groups"
              className="pl-12"
            />

            <div className="absolute top-1/2 -translate-y-1/2 pl-3 text-white">
              <Search />
            </div>
          </div>
        </form>
      </div>
      <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-[1fr,1fr] xl:mb-10 xl:gap-6 2xl:grid-cols-[1fr,1fr,1fr] 3xl:gap-8">
        {myCreatedGroups?.isLoading ||
        getAllJoinedGroups?.isLoading ||
        getAllGroups?.isLoading ? (
          <CardSkeleton />
        ) : (
          ""
        )}
        {query === "my-groups" &&
          groupsSlice?.myGroups?.map((group, i) => (
            <GroupCard group={group} key={i} showDetailsButton={true} />
          ))}

        {query === "joined" &&
          groupsSlice?.joinedGroups?.map((group, i) => (
            <GroupCard group={group} key={i} />
          ))}

        {query === "all" &&
          groupsSlice?.allGroups?.map((group, i) => (
            <GroupCard group={group} key={i} />
          ))}
      </div>
      <CreateGroup />
    </>
  );
}

export default function Groups() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Suspense fallback={<div>Loading groups...</div>}>
      {mounted && <GroupContent />}
    </Suspense>
  );
}

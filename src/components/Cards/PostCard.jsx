// Import necessary modules and components from Next.js and other libraries
"use client";
import Image from "next/image";
import { useState } from "react";

// Import custom Card components from UI
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import assets
import { ASSETS } from "@/assets";

// Import icons from lucide-react
import {
  ArrowUpDown,
  ImagePlus,
  MessageSquareText,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";

// Import custom icons
import { RepostIcon, ShareIcon } from "@/assets/Icons";
import TextareaInput from "../input/TextareaInput";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { CTAButton, CustomInput, Dropdown } from "..";
import SelectBox from "../input/SelectBox";
import { SelectContent, SelectItem } from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  useAddCommentMutation,
  useAllCommentsQuery,
  useDeletePostMutation,
  useDislikePostMutation,
  useLikePostMutation,
} from "@/redux/api";
import { useToast } from "@/hooks/use-toast";
import { updateModalState } from "@/redux/slices/ModalSlice";
import { useRouter } from "next/navigation";
import { ButtonLoader } from "../loader/ButtonLoader";
import { ProfileSkeleton } from "../skeleton/ProfileSkeleton";

const PostCard = ({ posts, id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const userId = useSelector((state) => state.AuthSlice.userId);

  const [deletePost, { isLoading, isError }] = useDeletePostMutation();

  const deleteCreatedPost = async () => {
    const response = await deletePost({ id: posts?.id, userid: userId });
    if (response?.data?.success) {
      toast({
        title: response?.data?.message
          ? response?.data?.message
          : "Post Deleted successfully",
      });
      router.push("/explore?type=my-posts");
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

  return (
    // Main Card component with custom styles
    <>
      <div className="rounded-2xl bg-none from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[2px] transition-all hover:bg-gradient-to-r">
        <Card className="rounded-2xl border-none bg-slate-gray p-5 outline-none sm:p-6 2xl:p-7 3xl:p-8 4xl:p-9">
          {/* CardHeader contains the header section with user info and options */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
            <div className="flex items-center gap-5 4xl:gap-7">
              {/* User image section with profile picture overlay */}
              <div className="relative h-14 w-14 4xl:h-20 4xl:w-20">
                <img
                  src={posts?.groupimage}
                  alt="Camera"
                  className="h-full w-full rounded-md object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-6 4xl:w-8">
                  <Image
                    src={ASSETS.USER_IMAGE}
                    alt="user"
                    className="w-full rounded-full"
                  />
                </div>
              </div>
              <div>
                <CardTitle className="cursor-pointer text-base text-white hover:underline sm:text-lg 3xl:text-xl">
                  {posts?.groupname}
                </CardTitle>
                <CardDescription className="text-sm text-[#a1a1aa] 3xl:text-base">
                  <span className="hover:underline">redredred</span> •{" "}
                  {dayjs(posts?.created_at)
                    .format("MMM-DD-YYYY")
                    .replaceAll("-", " ")}
                </CardDescription>
              </div>
            </div>

            <Dropdown
              dropdownMenu={[
                { name: "view", link: `/explore/${posts?.id}` },
                id &&
                  Number.parseInt(userId) ===
                    Number.parseInt(posts?.userid) && {
                    name: "Edit",
                    onClick: () =>
                      dispatch(updateModalState("openCreatePostModal")),
                    link: `#`,
                  },
                id &&
                  Number.parseInt(userId) ===
                    Number.parseInt(posts?.userid) && {
                    name: "Delete",
                    onClick: deleteCreatedPost,
                    link: `#`,
                  },
              ]}
            />
          </CardHeader>
          <CardContent className="p-0">
            {/* Post Heading */}
            <h3 className="mt-6 text-lg font-bold text-white md:text-xl 2xl:text-[22px] 4xl:mt-8 4xl:text-[26px]">
              {posts?.title}
            </h3>
            <div
              className="post_content mt-4 text-white"
              dangerouslySetInnerHTML={{ __html: posts?.description }}
            />
            {/* Post Image */}
            {posts?.image && (
              <div className="mx-auto mt-6 h-full w-full max-w-96 3xl:max-h-[552px] 3xl:max-w-[403px] 4xl:mt-8">
                <img
                  src={posts?.image}
                  alt="uploaded post"
                  className="block h-full w-full object-contain"
                />
              </div>
            )}
            {/* Post content */}
            <div className="mt-6 flex flex-wrap gap-4 3xl:mt-8">
              {/* Hashtags */}
              {posts?.tags &&
                posts?.tags?.split(",")?.map((tag, i) => {
                  return (
                    <p
                      key={i}
                      className="cursor-pointer text-sm text-[#B9FEF5] hover:underline sm:text-base 4xl:text-lg"
                    >
                      #{tag}
                    </p>
                  );
                })}
            </div>
          </CardContent>
          <PostActions userId={userId} posts={posts} />
        </Card>
      </div>
    </>
  );
};

const PostActions = ({ userId, posts }) => {
  const { toast } = useToast();

  const [comments, setComments] = useState(false);

  const [likePostMutation, { isError: isLikeError }] = useLikePostMutation();
  const [dislikePostMutation, { isError: isdisLikeError }] =
    useDislikePostMutation();

  const likePost = async () => {
    const response = await likePostMutation({
      userid: userId,
      postid: posts?.id,
    });
    if (isLikeError) {
      toast({
        variant: "destructive",
        title: response?.error?.data?.message
          ? response?.error?.data?.message
          : "Something went wrong! Please try again later",
      });
    }
  };

  const dislikePost = async () => {
    const response = await dislikePostMutation({
      userid: userId,
      postid: posts?.id,
    });
    if (isdisLikeError) {
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
      <CardFooter className="mt-6 flex items-center justify-between p-0 4xl:mt-8">
        {/* Footer with action icons */}
        <div className="flex gap-3 sm:gap-5 lg:gap-7">
          {/* Like post */}

          <div className="flex cursor-pointer items-center gap-1 text-white">
            <span
              onClick={likePost}
              className={`rounded p-1 hover:bg-white hover:text-black ${posts?.likedby?.includes(userId?.toString()) ? "bg-white text-black" : ""}`}
            >
              <ThumbsUp />
            </span>
            <span className="text-sm">{posts?.likedby?.length}</span>
          </div>

          {/* Dislike post */}

          <div className="flex cursor-pointer items-center gap-1 text-white">
            <span
              onClick={dislikePost}
              className={`rounded p-1 hover:bg-white hover:text-black ${posts?.dislikedby?.includes(userId?.toString()) ? "bg-white text-black" : ""}`}
            >
              <ThumbsDown />
            </span>
            <span className="text-sm">{posts?.dislikedby?.length}</span>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-5 lg:gap-7">
          {/* comment post */}
          <div
            onClick={() => setComments(!comments)}
            className="flex cursor-pointer items-center gap-1 text-white"
          >
            <MessageSquareText /> <span className="text-sm">7</span>
          </div>
          {/* repost post */}
          <div className="flex cursor-pointer gap-1 text-white">
            <RepostIcon />
          </div>
          {/* share post */}
          <div className="flex cursor-pointer gap-1 text-white">
            <ShareIcon />
          </div>
        </div>
      </CardFooter>
      <AddComments comments={comments} userId={userId} posts={posts} />
    </>
  );
};

// const [likePost] = useLikePostMutation

const AddComments = ({ comments, userId, posts }) => {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState("");

  const form = useForm({
    defaultValues: {
      comment: "",
      image: "",
    },
  });

  const [addComment, { isLoading: isCommentLoading }] = useAddCommentMutation();

  const previewUploadedImage = (e) => {
    setPreviewImage("");
    if (e.target.files && e.target.files[0]) {
      const uploadedImage = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(uploadedImage);
    }
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.click();
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userid", userId);
    formData.append("postid", posts?.id);
    formData.append("comment", data?.comment);
    formData.append("image", data?.image[0]);
    const response = await addComment(formData);
    if (response?.data?.success) {
      form.reset();
      toast({
        title: "Comment Added",
      });
      setPreviewImage("");
    } else {
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
      {comments && (
        <div className="my-4 lg:my-6 2xl:my-8 4xl:my-10">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-5">
            <Avatar className="hidden md:block">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="relative w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {previewImage && (
                    <div className="relative flex items-end justify-end">
                      <img
                        src={previewImage}
                        alt="uploaded image"
                        className="relative w-full max-w-16 rounded-md"
                      />
                      <span
                        onClick={() => {
                          form.setValue("image", "");
                          setPreviewImage("");
                        }}
                        className="absolute -right-2 -top-2 cursor-pointer rounded-md border-2 border-dark-slate bg-black text-white"
                      >
                        <X size={20} />
                      </span>
                    </div>
                  )}
                  <TextareaInput
                    control={form.control}
                    name="comment"
                    className="!mt-0"
                  />
                  <div className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-2 text-white">
                    <span
                      className="flex gap-2 text-base"
                      onClick={handleFileClick}
                    >
                      <ImagePlus />
                      GIF
                    </span>
                    <CTAButton extra="ml-4">
                      {isCommentLoading ? (
                        <div className="flex justify-center">
                          Comment <ButtonLoader />
                        </div>
                      ) : (
                        "Comment"
                      )}
                    </CTAButton>
                  </div>
                  <div className="hidden">
                    <input
                      name="image"
                      type="file"
                      placeholder="Title"
                      id="file"
                      {...form.register("image", {
                        onChange: previewUploadedImage,
                      })}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <DisplayComments posts={posts} />
        </div>
      )}
    </>
  );
};

const DisplayComments = ({ posts }) => {
  const allComments = useAllCommentsQuery({ postid: posts?.id });

  const [replyComment, setReplyComment] = useState(0);

  return (
    <>
      <div className="my-6 2xl:my-8 4xl:my-10">
        <div className="max-w-fit md:max-w-36">
          <SelectBox
            placeholder={
              <>
                <span className="md:hidden">
                  <ArrowUpDown />
                </span>
                <span className="hidden md:block">Newest</span>
              </>
            }
            className="w-full"
          >
            <SelectContent className="border-blue-gray bg-blue-gray text-white">
              <SelectItem
                className="mt-1 bg-blue-gray py-2 focus:!bg-slate-gray focus:text-white"
                value="newest"
              >
                Newest
              </SelectItem>
              <SelectItem
                className="mt-1 bg-blue-gray py-2 focus:!bg-slate-gray focus:text-white"
                value="oldest"
              >
                Oldest
              </SelectItem>
              <SelectItem
                className="mt-1 bg-blue-gray py-2 focus:!bg-slate-gray focus:text-white"
                value="top"
              >
                Top
              </SelectItem>
            </SelectContent>
          </SelectBox>
        </div>
      </div>

      {allComments?.isLoading ? (
        <>
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
        </>
      ) : (
        allComments?.data?.comments?.map((comment, i) => {
          return (
            <div key={i} className="mb-5 pt-6">
              <div className="flex items-center gap-2 sm:gap-5 lg:items-start">
                <Avatar>
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm text-[#a1a1aa] lg:text-[15px] 3xl:text-base">
                  <p>
                    <strong>pi</strong> • 1 hour ago
                  </p>
                </div>
              </div>
              <div className="mt-3 lg:-my-4 lg:mx-14">
                <div className="mt-3 overflow-hidden rounded-lg bg-blue-gray">
                  {comment?.image && <img src={comment?.image} alt="comment" />}
                  <p className="px-3 py-3 text-sm text-white lg:px-5 lg:text-[15px] 2xl:text-base 4xl:text-lg">
                    {comment?.comment}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-5">
                  <div className="flex cursor-pointer items-center gap-1 text-white hover:text-blue-700">
                    <ThumbsUp /> <span className="text-sm">1</span>
                  </div>
                  <div className="flex cursor-pointer items-center gap-1 text-white hover:text-red-700">
                    <ThumbsDown /> <span className="text-sm">1</span>
                  </div>
                  <div
                    onClick={() =>
                      setReplyComment(
                        comment?.id !== replyComment ? comment?.id : -1,
                      )
                    }
                    className="cursor-pointer text-sm text-white xl:text-[15px] 4xl:text-base"
                  >
                    Reply
                  </div>
                </div>
                {comment?.id === replyComment && (
                  <div className="mt-4 flex items-center gap-2">
                    <CustomInput
                      name="replyComment"
                      className="!py-2 !text-sm"
                      placeholder="reply"
                    />
                    <CTAButton>Reply</CTAButton>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default PostCard;

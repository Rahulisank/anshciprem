"use client";
import { ImagePlus, Plus, Search, UsersIcon, X } from "lucide-react";
import { useDebounce } from "use-debounce";
// Import UI components
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Import form handling and Redux hooks
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/slices/ModalSlice";

// Import custom input and login components
import FormInput from "@/components/input/FormInput";
import TextareaInput from "../input/TextareaInput";
import SelectBox from "../input/SelectBox";
import { SelectContent, SelectItem, SelectLabel } from "../ui/select";
import { CTAButton, CustomInput } from "..";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { useCallback, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostSchema } from "@/validation/createPost";
import {
  useAddPostsMutation,
  useEditPostMutation,
  useMyGroupsQuery,
} from "@/redux/api";
import { ButtonLoader } from "../loader/ButtonLoader";
import { useToast } from "@/hooks/use-toast";
import { ProfileSkeleton } from "../skeleton/ProfileSkeleton";

const CreatePost = ({ posts, postId, heading }) => {
  const { toast } = useToast();

  const [searchedValue, setSearchedValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchedValue, 500); // 500ms delay

  const form = useForm({
    defaultValues: {
      group: "",
      title: "",
      text: "",
      hashtags: [],
      image: "",
    },
    resolver: yupResolver(createPostSchema),
  });

  // Access the auth dialog state from the Redux store
  const authDialogState = useSelector((state) => state.ModalSlice);
  const userId = useSelector((state) => state.AuthSlice.userId);
  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();
  const [isMaturedContent, setIsMaturedContent] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [createPost, { isLoading: isCreateLoading, isError: isCreateError }] =
    useAddPostsMutation();
  const [editPost, { isLoading: isEditLoading, isError: isEditError }] =
    useEditPostMutation();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hashtags",
  });

  useEffect(() => {
    if (postId) {
      const defaultValues = {
        group: posts?.groupid?.toString(),
        title: posts?.title,
        text: posts?.description,
        hashtags: posts?.tags
          ? posts.tags.split(",").map((tag) => ({ hashtag: tag.trim() }))
          : [],
      };

      setPreviewImage(posts?.image);
      setIsMaturedContent(posts?.matured === "yes" ? true : false);

      form.reset(defaultValues);
    }
  }, [posts, append]);

  const myCreatedGroups = useMyGroupsQuery(
    { userid: userId },
    {
      skip: !userId,
    },
  );

  const handleSearch = useCallback((e) => {
    setSearchedValue(e.target.value.toLowerCase());
  }, []);

  const filteredGroups = useMemo(() => {
    return myCreatedGroups?.data?.groups?.filter((group) =>
      group?.groupname?.toLowerCase()?.includes(debouncedSearchValue),
    );
  }, [myCreatedGroups?.data?.groups, debouncedSearchValue]);

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

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("groupid", data?.group);
    formData.append("userid", userId);
    formData.append("title", data?.title);
    formData.append("description", data?.text);
    data?.hashtags?.forEach((elm) => formData.append("tags[]", elm?.hashtag));
    formData.append("matured", isMaturedContent ? "yes" : "no");
    formData.append("image", data?.image[0]);

    if (postId) {
      formData.append("id", postId);
      const response = await editPost(formData);
      if (response?.data?.success) {
        toast({
          title: response?.data?.message
            ? response?.data?.message
            : "Post Edited successfully",
        });
        dispatch(closeModal("openCreatePostModal"));
        form.reset();
        setIsMaturedContent(false);
      }
      if (isEditError) {
        toast({
          variant: "destructive",
          title: response?.error?.data?.message
            ? response?.error?.data?.message
            : "Something went wrong! Please try again later",
        });
      }
    } else {
      const response = await createPost(formData);
      if (response?.data?.success) {
        toast({
          title: response?.data?.message
            ? response?.data?.message
            : "Post Created successfully",
        });
        dispatch(closeModal("openCreatePostModal"));
        form.reset();
        setIsMaturedContent(false);
      }
      if (isCreateError) {
        toast({
          variant: "destructive",
          title: response?.error?.data?.message
            ? response?.error?.data?.message
            : "Something went wrong! Please try again later",
        });
      }
    }
  };

  return (
    <AlertDialog
      open={authDialogState.openCreatePostModal}
      onOpenChange={() => {
        dispatch(closeModal("openCreatePostModal"));
        form.reset();
        setPreviewImage("");
      }}
    >
      <AlertDialogContent
        className={cn(
          "w-11/12 gap-2 rounded-xl border-none bg-slate-gray sm:max-w-[32rem] xl:max-w-[40rem] xl:gap-3 2xl:max-w-[45rem] 4xl:gap-4",
        )}
      >
        <ScrollArea className="max-h-[80vh] p-0">
          <div className="flex items-center justify-between">
            {/* Dialog title */}
            <AlertDialogTitle className="text-xl text-white 2xl:text-2xl">
              {heading ? heading : "Create Post"}
            </AlertDialogTitle>
            {/*Dialog Close button */}
            <AlertDialogCancel
              className={cn(
                "mt-0 max-w-min justify-end border-none bg-slate-gray p-0 !text-white hover:bg-transparent",
              )}
            >
              <X />
            </AlertDialogCancel>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 flex flex-col gap-4 xl:gap-6"
            >
              <div className="w-full sm:w-1/2">
                <FormField
                  control={form.control}
                  name={"group"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <SelectBox
                        name="group"
                        placeholder={
                          <span className="flex items-center gap-2">
                            <UsersIcon /> Choose Groups
                          </span>
                        }
                        defaultValue={field.name}
                        value={field.value}
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                      >
                        <SelectContent className="relative top-3 rounded-xl border-blue-gray bg-blue-gray px-5 py-4 text-white">
                          <div className="relative mb-8">
                            <CustomInput
                              placeholder="Search"
                              className="w-full rounded-sm bg-[#52525B] py-5 pl-10 !text-sm"
                              onChange={handleSearch}
                              value={searchedValue}
                            />
                            <button className="absolute top-1/2 -translate-y-1/2 pl-3 text-white">
                              <Search className="lg:h-5 lg:w-5" />
                            </button>
                          </div>
                          {myCreatedGroups?.isPending ? (
                            <div className="flex flex-col gap-y-3">
                              <ProfileSkeleton />
                              <ProfileSkeleton />
                            </div>
                          ) : filteredGroups?.length >= 1 ? (
                            filteredGroups.map((group) => (
                              <SelectItem
                                key={group?.id}
                                value={group?.id?.toString()}
                                className="mt-4 !bg-transparent p-0"
                              >
                                <div className="flex items-center gap-3 p-0">
                                  <div className="w-10">
                                    <img
                                      src={group?.groupimage}
                                      alt="Group"
                                      className="h-10 w-10 rounded-md object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="cursor-pointer text-sm text-white sm:text-base">
                                      {group?.groupname}
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <>Please create a group</>
                          )}
                        </SelectContent>
                      </SelectBox>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormInput
                control={form.control}
                name="title"
                placeholder="Title"
              />
              <div className="relative">
                <TextareaInput control={form.control} name="text" />
                <div
                  className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-2 text-white"
                  onClick={handleFileClick}
                >
                  <ImagePlus /> <span className="text-base">GIF</span>
                </div>
              </div>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="uploaded image"
                  className="w-full max-w-16"
                />
              )}
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
              {fields?.length >= 1 && (
                <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative flex w-full items-center justify-between"
                    >
                      <FormInput
                        {...field}
                        placeholder="#hashtag"
                        name={`hashtags.${index}.hashtag`}
                        className="relative w-full"
                      />
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-blue-gray p-2 text-white"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <X />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <span
                  onClick={() => {
                    append({ hashtag: "" });
                  }}
                  className="flex max-w-max cursor-pointer items-start gap-2 rounded-full bg-blue-gray px-5 py-3 text-base text-[#a1a1aa]"
                >
                  #Add tags
                  <span>
                    <Plus />
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-end gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms1"
                    className={`border-white text-white ${isMaturedContent ? "!bg-white !text-dark-slate" : ""}`}
                    checked={isMaturedContent}
                    onCheckedChange={(checked) => {
                      setIsMaturedContent(checked);
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none text-white md:text-base"
                    >
                      Matured Content
                    </label>
                  </div>
                </div>
                <CTAButton
                  variant="primary"
                  className="relative min-w-[7rem] px-4 py-2"
                  disabled={isCreateLoading || isEditLoading}
                >
                  {isCreateLoading || isEditLoading ? (
                    <div className="flex justify-center">
                      {heading ? heading : "Create Post"} <ButtonLoader />
                    </div>
                  ) : heading ? (
                    heading
                  ) : (
                    "Create Post"
                  )}
                </CTAButton>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePost;

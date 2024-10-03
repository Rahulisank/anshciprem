"use client";
import { ImagePlus, X } from "lucide-react";
// Import UI components
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Import form handling and Redux hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/slices/ModalSlice";

// Import custom input and login components
import FormInput from "@/components/input/FormInput";
import TextareaInput from "../input/TextareaInput";

import { CTAButton } from "..";
import { ScrollArea } from "../ui/scroll-area";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { createGroupSchema } from "@/validation/createGroup";
import { useCreateGroupMutation, useEditGroupMutation } from "@/redux/api";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoader } from "../loader/ButtonLoader";
import { useRouter } from "next/navigation";

const CreateGroup = (props) => {
  // Access the auth dialog state from the Redux store
  const { toast } = useToast();
  const router = useRouter();
  const authDialogState = useSelector((state) => state.ModalSlice);
  const userId = useSelector((state) => state.AuthSlice.userId);

  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();
  // Initialize the form with default values

  const [createGroupMutation, { isLoading, isError }] =
    useCreateGroupMutation();

  const editGroup = useEditGroupMutation();

  const [isMaturedContent, setIsMaturedContent] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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

  const form = useForm({
    defaultValues: {
      groupName: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(createGroupSchema),
  });

  useEffect(() => {
    if (props?.groupDetails) {
      const defaultValues = {};
      defaultValues.groupName = props.groupDetails.groupname;
      defaultValues.description = props.groupDetails.description;
      setPreviewImage(props.groupDetails.groupimage);
      setIsMaturedContent(props.groupDetails.matured === "yes" ? true : false);
      form.reset(defaultValues);
    } else return;
  }, [props?.groupDetails]);

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userid", userId);
    formData.append("groupname", data.groupName);
    formData.append("description", data.description);
    formData.append("groupimage", data?.image[0]);
    formData.append("matured", isMaturedContent ? "yes" : "no");
    if (props?.groupDetails) {
      formData.append("groupId", props?.groupDetails?.id);
      const response = await editGroup[0](formData);
      if (response?.data?.success) {
        form.reset();
        toast({
          title: "Group Details Edited",
        });
        dispatch(closeModal("openCreateGroupModal"));
        setPreviewImage("");
      }
      if (isError) {
        toast({
          variant: "destructive",
          title: response?.error?.data?.message
            ? response?.error?.data?.message
            : "Something went wrong! Please try again later",
        });
      }
    } else {
      const response = await createGroupMutation(formData);
      if (response?.data?.success) {
        form.reset();
        toast({
          title: "Group Created",
        });
        dispatch(closeModal("openCreateGroupModal"));
        setPreviewImage("");
        router.push("/groups?type=my-groups");
      }
      if (isError) {
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
      open={authDialogState.openCreateGroupModal}
      onOpenChange={() => {
        dispatch(closeModal("openCreateGroupModal"));
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
              {props?.heading ? props?.heading : "Create Group"}
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
              <FormInput
                control={form.control}
                name="groupName"
                placeholder="Group Name"
              />
              <div className="relative">
                <TextareaInput control={form.control} name="description" />
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
                  // accept=".png,.jpg,.jpeg,.gif"
                  {...form.register("image", {
                    onChange: previewUploadedImage,
                  })}
                />
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
                <CTAButton disabled={isLoading || editGroup[1]?.isLoading}>
                  {editGroup[1].isLoading || isLoading ? (
                    <div className="flex justify-center">
                      {props?.heading ? props?.heading : "Create Group"}{" "}
                      <ButtonLoader />
                    </div>
                  ) : props?.heading ? (
                    props?.heading
                  ) : (
                    "Create Group"
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

export default CreateGroup;

"use client";
import { X } from "lucide-react";

// Import UI components
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Form } from "../components/ui/form";
import { cn } from "@/lib/utils";

// Import form handling and Redux hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModalState } from "@/redux/slices/ModalSlice";

// Import custom input and login components
import FormInput from "../components/input/FormInput";
import GoogleLogin from "./GoogleLogin";
import WalletLogin from "./WalletLogin";
import SignUpCredentials from "./SignUpCredentials";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpEmail } from "@/validation/auth";
import { useCheckEmailMutation } from "@/redux/api";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoader } from "@/components/loader/ButtonLoader";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");

  // Access the auth dialog state from the Redux store
  const authDialogState = useSelector((state) => state.ModalSlice);

  const { toast } = useToast();

  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();

  const [checkEmail, { isLoading, isError }] = useCheckEmailMutation();

  // Initialize the form with default values
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(signUpEmail),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const response = await checkEmail(data);
    if (response?.data?.success) {
      if (response?.data?.exists) {
        toast({
          variant: "destructive",
          title: "Email Already exists! Please use different email",
        });
        return;
      } else {
        form.reset();
        dispatch(updateModalState("openSignUpCredentialsModal"));
        setEmail(data?.email);
      }
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
    <>
      {/* Sign Up Modal */}
      <AlertDialog
        open={authDialogState.openSignUpModal}
        onOpenChange={() => {
          dispatch(closeModal("openSignUpModal"));
          form.reset();
        }}
      >
        <AlertDialogContent
          className={cn(
            "w-11/12 max-w-96 gap-2 rounded-xl border-none bg-slate-gray sm:max-w-[28rem] xl:max-w-[32rem] xl:gap-3 3xl:max-w-[35rem] 4xl:gap-4",
          )}
        >
          <div className="flex items-center justify-between">
            {/* Dialog title */}
            <AlertDialogTitle className="text-xl text-white 2xl:text-2xl 4xl:text-3xl">
              Sign Up
            </AlertDialogTitle>
            {/* Close button */}
            <AlertDialogCancel
              className={cn(
                "mt-0 max-w-min justify-end border-none bg-slate-gray p-0 !text-white hover:bg-transparent",
              )}
            >
              <X />
            </AlertDialogCancel>
          </div>
          <div className="mt-2 flex flex-col gap-y-3 md:mt-4 md:gap-y-4 xl:gap-y-5 4xl:mt-6">
            {/* Google login button */}
            <GoogleLogin />
            {/* Wallet login button */}
            <WalletLogin />
          </div>
          <div className="2x flex items-center py-2 text-sm sm:text-base lg:text-lg xl:py-4 2xl:text-xl 4xl:text-2xl">
            <div className="h-px flex-grow bg-blue-gray"></div>
            <div className="mx-3 text-[#a1a1aa]">or</div>
            <div className="h-px flex-grow bg-blue-gray"></div>
          </div>
          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email input */}
              <FormInput
                control={form.control}
                name="email"
                placeholder="Email"
                type="email"
              />
              <div className="mt-5 md:mt-6 md:gap-5 xl:mt-7 3xl:mt-8">
                {/* Switch to Login Modal */}
                <AlertDialogDescription className="cursor-pointer text-sm text-white md:text-base 3xl:text-lg">
                  Already a member?{" "}
                  <span
                    className="text-shiny-blue"
                    onClick={() => {
                      dispatch(updateModalState("openLoginModal"));
                      form.reset();
                    }}
                  >
                    Log In
                  </span>
                </AlertDialogDescription>
              </div>
              {/* Continue button */}
              <button
                disabled={isLoading}
                className="mt-5 w-full rounded-full bg-shiny-blue p-3 text-sm font-semibold text-dark-slate hover:bg-[#21ffdb] md:mt-6 md:text-base xl:mt-7 3xl:mt-8 3xl:text-lg"
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <ButtonLoader />
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Sign Up Credentials Modal */}
      <SignUpCredentials email={email} />
    </>
  );
};

export default SignUp;

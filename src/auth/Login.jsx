"use client";
import { useState } from "react";
import { EyeIcon, EyeOff, X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";

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
import { signInSchema } from "@/validation/auth";
import { useLoginMutation } from "@/redux/api";
import { ButtonLoader } from "@/components/loader/ButtonLoader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/useAuth";
import { useToken } from "@/lib/useToken";

const Login = () => {
  const { toast } = useToast();
  const { setToken } = useToken();
  const { setAuth } = useAuth();
  const [login, { isLoading, isError }] = useLoginMutation();

  // Local state to manage password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  // Access the auth dialog state from the Redux store
  const authDialogState = useSelector((state) => state.ModalSlice);

  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Initialize the form with default values
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const response = await login({
      email: data.identifier,
      password: data.password,
    });
    if (response?.data?.success) {
      form.reset();
      toast({
        title: response?.data?.message
          ? response?.data?.message
          : "Login successful",
      });
      setToken(response?.data?.userId);
      setAuth(response?.data);
      dispatch(closeModal("openLoginModal"));
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
    <AlertDialog
      open={authDialogState.openLoginModal}
      onOpenChange={() => {
        dispatch(closeModal("openLoginModal"));
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
            Log In
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Identifier input (email or username) */}
            <FormInput
              control={form.control}
              name="identifier"
              placeholder="Email or username"
            />
            <div className="relative mt-4 lg:mt-5 2xl:mt-6 4xl:mt-7">
              {/* Password input with visibility toggle */}
              <FormInput
                type={passwordVisible ? "text" : "password"}
                control={form.control}
                name="password"
                placeholder="Password"
              />
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#a1a1aa]"
              >
                {passwordVisible ? <EyeIcon /> : <EyeOff />}
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 md:mt-6 md:gap-5 xl:mt-7 2xl:gap-6 3xl:mt-8">
              {/* Forgot password link */}
              <AlertDialogDescription className="cursor-pointer text-sm text-shiny-blue md:text-base 3xl:text-lg">
                Forgot Password?
              </AlertDialogDescription>
              {/*Opens Sign up Dialog  */}
              <AlertDialogDescription className="cursor-pointer text-sm text-white md:text-base 3xl:text-lg">
                Don’t have an account?{" "}
                <span
                  className="text-shiny-blue"
                  onClick={() => {
                    dispatch(updateModalState("openSignUpModal"));
                    form.reset();
                  }}
                >
                  Sign Up
                </span>
              </AlertDialogDescription>
            </div>
            {/* Login button */}
            <button
              disabled={isLoading}
              className="mt-5 w-full rounded-full bg-shiny-blue p-3 text-sm font-semibold text-dark-slate hover:bg-[#21ffdb] md:mt-6 md:text-base xl:mt-7 3xl:mt-8 3xl:text-lg"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <ButtonLoader />
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Login;

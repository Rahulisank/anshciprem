"use client";

import Image from "next/image";
import { ASSETS } from "@/assets";

import { signIn, useSession } from "next-auth/react";
import { ButtonLoader } from "@/components/loader/ButtonLoader";

const GoogleLogin = () => {
  const { data, status } = useSession();

  console.log(data, status);

  return (
    <>
      <button
        onClick={() => signIn("google")}
        className="flex w-full items-center justify-center gap-3 rounded-full border-none bg-white p-3 text-sm font-semibold text-dark-slate sm:text-base 2xl:text-[17px] 3xl:text-lg 4xl:text-xl"
      >
        {false ? (
          <ButtonLoader />
        ) : (
          <>
            <Image src={ASSETS.GOOGLE_ICON} alt="google" className="w-6" />
            Log in with Google
          </>
        )}
      </button>
    </>
  );
};

export default GoogleLogin;

"use client";

import Image from "next/image";

// import all assets object
import { ASSETS } from "@/assets";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useConnect } from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";

const WalletLogin = () => {
  // const wallet = new MetaMaskWallet();

  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });

  const { connect, isConnecting, error } = useConnect();

  const handleConnect = () => {
    connect(async () => {
      const metamask = createWallet("io.metamask");
      await metamask.connect({ client });
      return metamask;
    });
  };

  return (
    // <button
    //   onClick={handleConnect}
    //   className="flex w-full items-center justify-center gap-3 rounded-full border-none bg-white p-3 text-sm font-semibold text-dark-slate sm:text-base 2xl:text-[17px] 3xl:text-lg 4xl:text-xl"
    // >
    //   <Image src={ASSETS.WALLET_ICON} alt="google" className="w-6" />
    //   Log in with wallet
    // </button>
    <ConnectButton
      client={client}
      wallets={[
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
      ]}
    />
  );
};

export default WalletLogin;

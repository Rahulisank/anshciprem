"use client";

import { ThirdwebProvider } from "thirdweb/react";

export default function WalletProvider({ children }) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}

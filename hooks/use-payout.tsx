"use client";

import { PayoutProviderContext } from "@/provider/payout-provider";
import { useContext } from "react";

export const usePayout = () => {
  const context = useContext(PayoutProviderContext);
  if (!context) {
    throw new Error("usePayout must be used within a PayoutProvider");
  }
  return context;
};

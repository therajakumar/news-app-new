"use client";

import { AnalyticsProviderContext } from "@/provider/analytics-provider";
import { useContext } from "react";

export const useAnalytics = () => {
  const context = useContext(AnalyticsProviderContext);

  if (!context) {
    throw new Error("useAnalytics must be used within a AnalyticsProvider");
  }

  return context;
};

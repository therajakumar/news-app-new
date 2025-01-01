"use client";

import { generateAnalyticsData } from "@/constants";
import { AnalyticsData } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

type AnalyticsProviderState = {
  analyticsData: AnalyticsData[];
  totalPayout: number;
  currentDatePayout: number;
  dateWisetoalPayout: {
    date: Date;
    total: number;
  }[];
  categoryWisePayout: {
    category: string;
    total: number;
  }[];
  addAnalyticsData: (newData: AnalyticsData) => void;
};

const initialState: AnalyticsProviderState = {
  analyticsData: [],
  totalPayout: 0,
  currentDatePayout: 0,
  categoryWisePayout: [],
  dateWisetoalPayout: [],
  addAnalyticsData: () => {},
};

export const AnalyticsProviderContext =
  createContext<AnalyticsProviderState>(initialState);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [totalPayout, setTotalPayout] = useState<number>(0);
  const [currentDatePayout, setCurrentDatePayout] = useState<number>(0);
  const [dateWisetoalPayout, setDateWiseTotalPayout] = useState<
    { date: Date; total: number }[]
  >([]);
  const [categoryWisePayout, setCategoryWisePayout] = useState<
    { category: string; total: number }[]
  >([]);

  // Initialize analytics data from localStorage or generate new data
  useEffect(() => {
    const localData = localStorage.getItem("analyticsData");
    const initialData = localData
      ? JSON.parse(localData)
      : generateAnalyticsData();

    if (!localData) {
      localStorage.setItem("analyticsData", JSON.stringify(initialData));
    }

    setAnalyticsData(initialData);
  }, []);

  // Calculate and update dependent state when analyticsData changes
  useEffect(() => {
    const total = analyticsData.reduce((acc, data) => acc + data.amount, 0);
    setTotalPayout(total);

    const today = new Date();
    const todayData = analyticsData.filter(
      (data) => new Date(data.date).toDateString() === today.toDateString()
    );
    setCurrentDatePayout(todayData.reduce((acc, data) => acc + data.amount, 0));

    const dateWiseTotals = analyticsData.reduce((acc, data) => {
      const date = new Date(data.date).toDateString();
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        existing.total += data.amount;
      } else {
        acc.push({ date: date, total: data.amount });
      }
      return acc;
    }, [] as { date: string; total: number }[]);
    setDateWiseTotalPayout(
      dateWiseTotals.map((item) => ({
        date: new Date(item.date),
        total: item.total,
      }))
    );

    const categoryTotals = analyticsData.reduce((acc, data) => {
      const existing = acc.find((cat) => cat.category === data.category);
      if (existing) {
        existing.total += data.amount;
      } else {
        acc.push({ category: data.category, total: data.amount });
      }
      return acc;
    }, [] as { category: string; total: number }[]);
    setCategoryWisePayout(categoryTotals);
  }, [analyticsData]);

  // Add new analytics data
  const addAnalyticsData = (newData: AnalyticsData) => {
    const updatedData = [...analyticsData, newData];
    setAnalyticsData(updatedData);
    localStorage.setItem("analyticsData", JSON.stringify(updatedData));
  };

  const value = {
    analyticsData,
    totalPayout,
    currentDatePayout,
    dateWisetoalPayout,
    categoryWisePayout,
    addAnalyticsData,
  };

  return (
    <AnalyticsProviderContext.Provider value={value}>
      {children}
    </AnalyticsProviderContext.Provider>
  );
};

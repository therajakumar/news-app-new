import { AnalyticsData, Category } from "@/types";

export const DEFAULT_CATEGORIES: Category[] = [
  {
    category: "politics",
    amount: 1,
  },
  {
    category: "business",
    amount: 1,
  },
  {
    category: "world",
    amount: 4,
  },
  {
    category: "film",
    amount: 1,
  },
  {
    category: "global-development",
    amount: 2,
  },
  {
    category: "food",
    amount: 3,
  },
  {
    category: "us-news",
    amount: 5,
  },
];

export const generateAnalyticsData = (): AnalyticsData[] => {
  const categories = DEFAULT_CATEGORIES.map((cat) => cat.category);
  const today = new Date();

  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return {
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Math.floor(Math.random() * 1000) + 1, // Random amount between 1 and 1000
      date: date,
    };
  });
};

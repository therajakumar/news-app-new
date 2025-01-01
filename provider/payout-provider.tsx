"use client";

import { DEFAULT_CATEGORIES } from "@/constants";
import { Category } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

type PayoutProviderProps = {
  children: ReactNode;
};

type PayoutProviderState = {
  category: Category[];
  addCateory: (newCategory: Category) => void;
  updateCategory: (updatedCategory: Category) => void;
  deleteCategory: (categoryName: string) => void;
};

const initialState: PayoutProviderState = {
  category: [],
  addCateory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
};

export const PayoutProviderContext =
  createContext<PayoutProviderState>(initialState);

export const PayoutProvider = ({ children }: PayoutProviderProps) => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem("category");
    if (!localData) {
      localStorage.setItem("category", JSON.stringify(DEFAULT_CATEGORIES));
      setCategory(DEFAULT_CATEGORIES);
    } else {
      setCategory(JSON.parse(localData));
    }
  }, []);

  const addCateory = (newCategory: Category) => {
    const updatedCategories = [...category, newCategory];
    setCategory(updatedCategories);
    localStorage.setItem("category", JSON.stringify(updatedCategories));
  };

  const updateCategory = (updatedCategory: Category) => {
    const updatedCategories = category.map((cat) =>
      cat.category === updatedCategory.category ? updatedCategory : cat
    );
    setCategory(updatedCategories);
    localStorage.setItem("category", JSON.stringify(updatedCategories));
  };

  const deleteCategory = (categoryName: string) => {
    const updatedCategories = category.filter(
      (cat) => cat.category !== categoryName
    );
    setCategory(updatedCategories);
    localStorage.setItem("category", JSON.stringify(updatedCategories));
  };

  const value = {
    category,
    addCateory,
    updateCategory,
    deleteCategory,
  };

  return (
    <PayoutProviderContext.Provider value={value}>
      {children}
    </PayoutProviderContext.Provider>
  );
};

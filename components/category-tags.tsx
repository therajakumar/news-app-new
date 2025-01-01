"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "All",
  "Politics",
  "Business",
  "World",
  "Film",
  "Global development",
  "Food",
  "US news",
];

export function CategoryTags() {
  const router = useRouter();
  const params = useSearchParams();

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      router.push("/");
      return;
    }
    const lowerCategory = category.toLowerCase().split(" ").join("-");
    router.push(`?category=${lowerCategory}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={cn(
            "px-4 py-1 text-sm rounded-full border hover:bg-secondary transition-colors",
            params.get("category") ===
              category.toLowerCase().split(" ").join("-") &&
              "bg-secondary text-white",
            params.get("category") === null &&
              category === "All" &&
              "bg-secondary text-white"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

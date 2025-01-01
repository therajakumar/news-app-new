"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle({ element }: { element?: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center gap-2 w-full",
        element ? "justify-start" : "justify-center"
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div className="relative w-[1.5rem] h-[1.5rem] flex items-center justify-center">
        <Sun className="absolute h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      {element && (
        <span className="text-sm font-medium text-center">{element}</span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

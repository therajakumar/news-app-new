"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BarChart2, DollarSign, Home } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Payouts", href: "/payout", icon: DollarSign },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme } = useTheme();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-3 mt-8">
          {navigation.map(({ name, href, icon: Icon }) => (
            <Link key={name} href={href} onClick={onClose}>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg font-semibold py-5 gap-3"
              >
                <Icon className="w-6 h-6" />
                {name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center font-semibold py-5 gap-3">
          <ModeToggle
            element={
              <div>Switch to {theme === "dark" ? "light" : "dark"} mode</div>
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

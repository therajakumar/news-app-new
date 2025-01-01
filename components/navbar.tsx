"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Sidebar } from "./sidebar";
import { Label } from "./ui/label";

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const pathname = usePathname();

  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURLParams();
    setIsFilterOpen(false);
  };

  const updateURLParams = () => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("query", searchQuery);
    }

    if (startDate) {
      params.set("start_date", startDate.toISOString().split("T")[0]);
    }

    if (endDate) {
      params.set("end_date", endDate.toISOString().split("T")[0]);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <div className="hidden font-semibold text-xl md:flex md:items-center md:space-x-8 ml-8">
              {pathname === "/"
                ? "Home"
                : pathname.slice(1, 2).toUpperCase() + pathname.slice(2)}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {pathname === "/" && (
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="default">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="end">
                  <form onSubmit={handleSearch} className="grid gap-4 p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Search</h4>
                      <Input
                        type="text"
                        placeholder="Enter keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Date Range</h4>
                      <div className="flex items-center justify-between space-x-2">
                        <Label>From </Label>
                        <DatePicker
                          date={startDate}
                          onDateChange={setStartDate}
                          placeholder="Start Date"
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label>To </Label>
                        <DatePicker
                          date={endDate}
                          onDateChange={setEndDate}
                          placeholder="End Date"
                        />
                      </div>
                    </div>
                    <Button type="submit">Apply Filters</Button>
                  </form>
                </PopoverContent>
              </Popover>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </nav>
  );
}

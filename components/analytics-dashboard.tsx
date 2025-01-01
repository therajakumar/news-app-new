"use client";

import { useAnalytics } from "@/hooks/use-analytics";
import { CategoryWisePayoutBarChart } from "./category-wise-payout-bar-chart";
import { CategoryWisePayoutPieChart } from "./category-wise-payout-pie-chart";
import { CategoryWisePayoutTable } from "./category-wise-payout-table";
import { DateWisePayoutBarChart } from "./date-wise-payout-bar-chart";
import { DateWisePayoutPieChart } from "./date-wise-payout-pie-chart";
import { DateWisePayoutTable } from "./date-wise-payout-table";
import { ExportSnapshotToPDF } from "./export-to-pdf";
import { SummaryCards } from "./summary-cards";
import { ExportCSVButton } from "./export-to-csv";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsDashboard() {
  const {
    currentDatePayout,
    dateWisetoalPayout,
    totalPayout,
    categoryWisePayout,
  } = useAnalytics();

  return (
    <div
      className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="analytics-content"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">
          Analytics Dashboard
        </h1>
        <ExportSnapshotToPDF elementId="analytics-content" />
      </div>
      <SummaryCards
        totalPayout={totalPayout}
        currentDatePayout={currentDatePayout}
      />

      <div className="grid gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Date-wise Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Table View</h3>
              <ExportCSVButton
                data={dateWisetoalPayout}
                filename="dateWiseTotalPayout"
              />
            </div>
            <ScrollArea className="w-full" style={{ maxHeight: "400px" }}>
              <DateWisePayoutTable dateWisetoalPayout={dateWisetoalPayout} />
            </ScrollArea>
            <h3 className="text-lg font-semibold pt-4">Bar Graph</h3>
            <DateWisePayoutBarChart dateWisetoalPayout={dateWisetoalPayout} />
            <h3 className="text-lg font-semibold pt-4">Pie Chart</h3>
            <DateWisePayoutPieChart dateWisetoalPayout={dateWisetoalPayout} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Category-wise Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Table View</h3>
              <ExportCSVButton
                data={categoryWisePayout}
                filename="categoryWisePayout"
              />
            </div>
            <ScrollArea className="w-full" style={{ maxHeight: "400px" }}>
              <CategoryWisePayoutTable
                categoryWisePayout={categoryWisePayout}
              />
            </ScrollArea>
            <h3 className="text-lg font-semibold pt-4">Bar Graph</h3>
            <div>
              <CategoryWisePayoutBarChart
                categoryWisePayout={categoryWisePayout}
              />
            </div>
            <h3 className="text-lg font-semibold pt-4">Pie Chart</h3>
            <CategoryWisePayoutPieChart
              categoryWisePayout={categoryWisePayout}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SummaryCardsProps {
  totalPayout: number;
  currentDatePayout: number;
}

export function SummaryCards({ totalPayout, currentDatePayout }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalPayout.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Date Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${currentDatePayout.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  )
}


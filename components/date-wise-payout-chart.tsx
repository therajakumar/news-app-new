"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DateWisePayoutChartProps {
  dateWisetoalPayout: {
    date: Date;
    total: number;
  }[];
}

export function DateWisePayoutChart({ dateWisetoalPayout }: DateWisePayoutChartProps) {
  const data = dateWisetoalPayout.map(item => ({
    date: item.date.toLocaleDateString(),
    total: item.total
  }))

  return (
    <ChartContainer
      config={{
        total: {
          label: "Total Payout",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}


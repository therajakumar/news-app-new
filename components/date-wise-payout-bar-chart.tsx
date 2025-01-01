"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface DateWisePayoutBarChartProps {
  dateWisetoalPayout: {
    date: Date;
    total: number;
  }[];
}

export function DateWisePayoutBarChart({
  dateWisetoalPayout,
}: DateWisePayoutBarChartProps) {
  const data = dateWisetoalPayout.map((item) => ({
    date: item.date.toLocaleDateString(),
    total: item.total,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

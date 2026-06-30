"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthlyBurialStat } from "@/data/types";

interface BurialsChartProps {
  data: MonthlyBurialStat[];
}

export default function BurialsChart({ data }: BurialsChartProps) {
  const chartData = data.map((item) => {
    const [month, year] = item.month.split(" ");
    return {
      ...item,
      monthLabel: `${month} '${year?.slice(2) ?? ""}`,
    };
  });

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Monthly Burials</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-4 sm:px-6 sm:pb-6">
        <div className="h-64 sm:h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="monthLabel"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={20}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
                }}
              />
              <Bar
                dataKey="burials"
                fill="#1e3a5f"
                radius={[4, 4, 0, 0]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

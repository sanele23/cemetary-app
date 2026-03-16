"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCemeteries, getMonthlyBurialStats } from "@/services/mock-api";
import type { Cemetery, MonthlyBurialStat } from "@/data/types";

const COLORS = [
  "#1e3a5f",
  "#2563eb",
  "#0ea5e9",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function AdminReportsPage() {
  const [cemeteries, setCemeteries] = useState<Cemetery[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyBurialStat[]>([]);

  useEffect(() => {
    getCemeteries().then(setCemeteries);
    getMonthlyBurialStats().then(setMonthlyStats);
  }, []);

  const pieData = cemeteries.map((c) => ({
    name: c.name
      .replace(" Cemetery", "")
      .replace(" Memorial Park", "")
      .replace(" Memorial Gardens", ""),
    value: c.totalGraves,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Analytics and reports for cemetery management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Generate PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Burials Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Burial Trends</CardTitle>
            <CardDescription>Burials registered per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Bar
                    dataKey="burials"
                    fill="#1e3a5f"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Graves Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Graves Distribution</CardTitle>
            <CardDescription>Total graves per cemetery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cemetery Capacity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cemetery Capacity Report</CardTitle>
          <CardDescription>
            Overview of cemetery utilisation and available plots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cemetery</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Total Graves</TableHead>
                <TableHead>Available Plots</TableHead>
                <TableHead>Utilisation</TableHead>
                <TableHead>Capacity Bar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cemeteries.map((cem) => {
                const utilisation =
                  ((cem.totalGraves - cem.availablePlots) / cem.totalGraves) *
                  100;
                return (
                  <TableRow key={cem.id}>
                    <TableCell className="font-medium">{cem.name}</TableCell>
                    <TableCell>{cem.city}</TableCell>
                    <TableCell>{cem.totalGraves.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-emerald-600">
                      {cem.availablePlots.toLocaleString()}
                    </TableCell>
                    <TableCell>{utilisation.toFixed(1)}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full max-w-32 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${utilisation}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

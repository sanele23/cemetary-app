"use client";

import { useState, useEffect } from "react";
import { Building2, Cross, BookOpen, Users } from "lucide-react";
import StatsCard from "@/components/admin/stats-card";
import BurialsChart from "@/components/admin/burials-chart";
import RecentRecords from "@/components/admin/recent-records";
import {
  getDashboardStats,
  getMonthlyBurialStats,
  getRecentBurials,
} from "@/services/mock-api";
import type { MonthlyBurialStat, Burial } from "@/data/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCemeteries: 0,
    totalGraves: 0,
    burialsThisMonth: 0,
    totalUsers: 0,
  });
  const [chartData, setChartData] = useState<MonthlyBurialStat[]>([]);
  const [recentBurials, setRecentBurials] = useState<Burial[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getMonthlyBurialStats().then(setChartData);
    getRecentBurials(5).then(setRecentBurials);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of cemetery management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Cemeteries"
          value={stats.totalCemeteries}
          icon={Building2}
          description="Registered cemeteries"
        />
        <StatsCard
          title="Total Graves"
          value={stats.totalGraves.toLocaleString()}
          icon={Cross}
          description="Across all cemeteries"
        />
        <StatsCard
          title="Burials This Month"
          value={stats.burialsThisMonth}
          icon={BookOpen}
          trend={{ value: "12% from last month", positive: false }}
        />
        <StatsCard
          title="System Users"
          value={stats.totalUsers}
          icon={Users}
          description="Active administrators"
        />
      </div>

      {/* Chart + Recent Records */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BurialsChart data={chartData} />
        <RecentRecords records={recentBurials} />
      </div>
    </div>
  );
}

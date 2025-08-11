import { Users, DollarSign, Server, Database, Activity } from "lucide-react";
import MetricCard from "./MetricCard";
import RevenueChart from "./RevenueChart";
import CostBreakdown from "./CostBreakdown";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h2>
        <p className="text-white">
          Overview of your business metrics and performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Website Traffic"
          value="2,543"
          description="from last month"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Revenue"
          value="$15,234"
          description="from last month"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Operating Costs"
          value="$4,385"
          description="from last month"
          icon={<Server className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: false }}
        />
        <MetricCard
          title="Database Usage"
          value="68%"
          description="of capacity"
          icon={<Database className="h-4 w-4" />}
          trend={{ value: 10.3, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart className="lg:col-span-4" />
        <CostBreakdown className="lg:col-span-3" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity className="lg:col-span-4" />
        <div className="rounded-lg border border-[#2a2a3a] bg-[#1e1e2d] p-4 lg:col-span-3">
          <h3 className="font-semibold text-white">System Health</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-white" />
                  <span className="text-white">Server Status</span>
                </div>
                <span className="text-emerald-500 font-medium">
                  Operational
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#2a2a3a]">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: "98%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Database className="mr-2 h-4 w-4 text-white" />
                  <span className="text-white">Database Status</span>
                </div>
                <span className="text-emerald-500 font-medium">
                  Operational
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#2a2a3a]">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Server className="mr-2 h-4 w-4 text-white" />
                  <span className="text-white">API Status</span>
                </div>
                <span className="text-amber-500 font-medium">Degraded</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#2a2a3a]">
                <div
                  className="h-2 rounded-full bg-amber-500"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

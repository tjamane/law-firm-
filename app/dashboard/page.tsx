'use client';

import { Users, Briefcase, FileSignature, Scale } from 'lucide-react';
import { dashboardStats } from '@/data/mock-data';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { StatsCard } from '@/components/dashboard/stats-card';
import { CasesChart, RevenueChart } from '@/components/dashboard/dashboard-charts';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your legal practice performance
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Clients"
          value={dashboardStats.totalClients}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatsCard
          title="Active Cases"
          value={dashboardStats.activeCases}
          icon={Briefcase}
          trend={{ value: 8, isPositive: true }}
          delay={0.05}
        />
        <StatsCard
          title="Pending Contracts"
          value={dashboardStats.pendingContracts}
          icon={FileSignature}
          trend={{ value: 3, isPositive: false }}
          delay={0.1}
        />
        <StatsCard
          title="Upcoming Hearings"
          value={dashboardStats.upcomingHearings}
          icon={Scale}
          delay={0.15}
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CasesChart />
        <RevenueChart />
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Add New Client', icon: Users },
              { label: 'Create Case', icon: Briefcase },
              { label: 'Draft Contract', icon: FileSignature },
              { label: 'Schedule Hearing', icon: Scale },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors text-sm"
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

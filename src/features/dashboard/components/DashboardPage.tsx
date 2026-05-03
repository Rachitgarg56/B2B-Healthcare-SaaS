import React from 'react';
import { Users, UserCheck, AlertTriangle, Activity } from 'lucide-react';
import { StatCard } from '../../../components/ui/StatCard';
import { useDashboardData } from '../hooks/useDashboardData';
import { DashboardHeader } from './DashboardHeader';
import { MetricsRow } from './MetricsRow';
import { RecentPatientsList } from './RecentPatientsList';
import { WardOccupancy } from './WardOccupancy';
import { NotificationsPanel } from './NotificationsPanel';

export const DashboardPage: React.FC = () => {
  const { user, stats, recentPatients, recentNotifications, greeting } = useDashboardData();

  return (
    <div className="space-y-6 page-enter">
      <DashboardHeader greeting={greeting} userName={user?.displayName || 'Dr. Admin'} />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={stats.total}
          subtitle="All registered"
          icon={<Users size={18} className="text-primary-600" />}
          iconBg="bg-primary-50"
          accent="bg-primary-500"
          trend={{ value: 12.5, label: 'vs last month' }}
        />
        <StatCard
          title="Active Cases"
          value={stats.active}
          subtitle="Currently admitted"
          icon={<Activity size={18} className="text-violet-600" />}
          iconBg="bg-violet-50"
          accent="bg-violet-500"
          trend={{ value: 4.2, label: 'vs last week' }}
        />
        <StatCard
          title="Critical"
          value={stats.critical}
          subtitle="Needs attention"
          icon={<AlertTriangle size={18} className="text-danger-600" />}
          iconBg="bg-danger-50"
          accent="bg-danger-500"
          trend={{ value: -8.1, label: 'vs last week' }}
        />
        <StatCard
          title="Recovered"
          value={stats.recovered}
          subtitle="This month"
          icon={<UserCheck size={18} className="text-success-600" />}
          iconBg="bg-success-50"
          accent="bg-success-500"
          trend={{ value: 18.3, label: 'vs last month' }}
        />
      </div>

      <MetricsRow />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentPatientsList patients={recentPatients} />

        <div className="space-y-4">
          <WardOccupancy />
          <NotificationsPanel notifications={recentNotifications} />
        </div>
      </div>
    </div>
  );
};

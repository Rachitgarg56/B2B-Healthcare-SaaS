import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, AlertTriangle, TrendingUp, ArrowRight, Clock, Stethoscope, Heart, Activity } from 'lucide-react';
import { StatCard } from '../../../components/ui/StatCard';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { usePatientStore } from '../../../stores/patientStore';
import { useAuthStore } from '../../../stores/authStore';
import { useNotificationStore } from '../../../stores/notificationStore';
import { format, parseISO, isToday, isYesterday } from 'date-fns';

function formatVisitDate(dateStr: string) {
  try {
    const d = parseISO(dateStr);
    if (isToday(d)) return 'Today';
    if (isYesterday(d)) return 'Yesterday';
    return format(d, 'MMM d');
  } catch { return dateStr; }
}

export const DashboardPage: React.FC = () => {
  const { patients } = usePatientStore();
  const { user } = useAuthStore();
  const { notifications } = useNotificationStore();

  const stats = useMemo(() => ({
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    critical: patients.filter(p => p.status === 'critical').length,
    recovered: patients.filter(p => p.status === 'recovered').length,
  }), [patients]);

  const recentPatients = useMemo(() =>
    [...patients].sort((a, b) => b.admissionDate.localeCompare(a.admissionDate)).slice(0, 6),
    [patients]
  );

  const recentNotifications = notifications.filter(n => !n.read).slice(0, 4);

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6 page-enter">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-surface-500 text-sm">{greeting},</p>
          <h2 className="font-display text-2xl font-bold text-surface-900">{user?.displayName || 'Dr. Admin'} 👋</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-surface-400 bg-white border border-surface-200 rounded-xl px-3 py-2 shadow-card">
          <Clock size={13} />
          <span>{format(new Date(), "EEEE, MMMM d, yyyy")}</span>
        </div>
      </div>

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

      {/* Quick metrics row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Bed Occupancy', value: '78%', color: 'bg-primary-500', icon: <Stethoscope size={14} className="text-primary-600" /> },
          { label: 'Avg Stay (days)', value: '4.2', color: 'bg-teal-500', icon: <Clock size={14} className="text-teal-600" /> },
          { label: 'Recovery Rate', value: '94%', color: 'bg-success-500', icon: <Heart size={14} className="text-success-600" /> },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-surface-50 flex items-center justify-center flex-shrink-0 border border-surface-200">{m.icon}</div>
            <div className="min-w-0">
              <p className="text-lg font-display font-bold text-surface-900">{m.value}</p>
              <p className="text-[10px] text-surface-400 truncate">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent patients */}
        <Card className="lg:col-span-2" padding="none">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-surface-100">
            <div>
              <h3 className="font-display text-sm font-bold text-surface-900">Recent Admissions</h3>
              <p className="text-xs text-surface-400 mt-0.5">Latest patient records</p>
            </div>
            <Link to="/patients">
              <Button variant="ghost" size="xs" iconRight={<ArrowRight size={12} />}>View all</Button>
            </Link>
          </div>
          <div className="divide-y divide-surface-100">
            {recentPatients.map(patient => (
              <div key={patient.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-50 transition-colors">
                <Avatar name={patient.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-surface-900 truncate">{patient.name}</p>
                    <span className="text-[10px] font-mono text-surface-400 hidden sm:block">{patient.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-xs text-surface-400">{patient.condition}</p>
                    <span className="text-surface-300">·</span>
                    <p className="text-xs text-surface-400">{patient.doctor}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <Badge variant={patient.status} dot>{patient.status}</Badge>
                  <p className="text-[10px] text-surface-400">{formatVisitDate(patient.admissionDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sidebar panels */}
        <div className="space-y-4">
          {/* Ward occupancy */}
          <Card padding="md">
            <h3 className="font-display text-sm font-bold text-surface-900 mb-4">Ward Occupancy</h3>
            <div className="space-y-3">
              {[
                { ward: 'ICU', used: 8, total: 10, color: 'bg-danger-500' },
                { ward: 'Cardiology', used: 18, total: 24, color: 'bg-primary-500' },
                { ward: 'General', used: 32, total: 48, color: 'bg-success-500' },
                { ward: 'Orthopedic', used: 11, total: 16, color: 'bg-violet-500' },
              ].map(({ ward, used, total, color }) => (
                <div key={ward}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-surface-700">{ward}</span>
                    <span className="text-surface-400 font-mono">{used}/{total}</span>
                  </div>
                  <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${(used / total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card padding="none">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-surface-100">
              <h3 className="font-display text-sm font-bold text-surface-900">Alerts</h3>
              <Link to="/notifications"><Button variant="ghost" size="xs">See all</Button></Link>
            </div>
            {recentNotifications.length === 0 ? (
              <p className="text-xs text-surface-400 text-center py-4">No new alerts</p>
            ) : (
              <div className="divide-y divide-surface-100">
                {recentNotifications.map(n => (
                  <div key={n.id} className="px-4 py-3 flex items-start gap-2.5">
                    <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.type === 'error' ? 'bg-danger-500' : n.type === 'success' ? 'bg-success-500' : n.type === 'warning' ? 'bg-warning-500' : 'bg-primary-500'}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-surface-800 truncate">{n.title}</p>
                      <p className="text-[10px] text-surface-400 mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

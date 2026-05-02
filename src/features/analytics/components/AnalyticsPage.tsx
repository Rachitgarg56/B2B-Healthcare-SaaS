import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card } from '../../../components/ui/Card';
import { TrendingUp, Users, Activity, ArrowUpRight } from 'lucide-react';
import { analyticsData } from '../../../lib/mockData';
import { usePatientStore } from '../../../stores/patientStore';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-900 border border-surface-700 rounded-xl px-3.5 py-2.5 shadow-xl">
      <p className="text-xs font-semibold text-surface-300 mb-1.5">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold text-white">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold">{`${(percent * 100).toFixed(0)}%`}</text>;
};

export const AnalyticsPage: React.FC = () => {
  const { patients } = usePatientStore();
  const totalPatients = patients.length;
  const avgAge = Math.round(patients.reduce((s, p) => s + p.age, 0) / patients.length);
  const criticalPct = Math.round((patients.filter(p => p.status === 'critical').length / totalPatients) * 100);

  return (
    <div className="space-y-6 page-enter">
      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: totalPatients, sub: '+12.5% MoM', color: 'text-primary-600', icon: <Users size={16} className="text-primary-500" />, bg: 'bg-primary-50' },
          { label: 'Avg Patient Age', value: `${avgAge} yrs`, sub: 'All demographics', color: 'text-violet-600', icon: <Activity size={16} className="text-violet-500" />, bg: 'bg-violet-50' },
          { label: 'Monthly Growth', value: '11.8%', sub: 'Admissions trend', color: 'text-teal-600', icon: <TrendingUp size={16} className="text-teal-500" />, bg: 'bg-teal-50' },
          { label: 'Critical Rate', value: `${criticalPct}%`, sub: 'Needs monitoring', color: 'text-danger-600', icon: <ArrowUpRight size={16} className="text-danger-500" />, bg: 'bg-danger-50' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-4 hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-xl ${k.bg} flex items-center justify-center`}>{k.icon}</div>
            </div>
            <p className="text-xl font-display font-bold text-surface-900">{k.value}</p>
            <p className="text-[10px] text-surface-400 mt-0.5">{k.label}</p>
            <p className={`text-[10px] font-semibold mt-1 ${k.color}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly trend */}
      <Card padding="none">
        <div className="px-5 pt-5 pb-4 border-b border-surface-100">
          <h3 className="font-display text-sm font-bold text-surface-900">Monthly Patient Flow</h3>
          <p className="text-xs text-surface-400 mt-0.5">Admissions vs discharges over 12 months</p>
        </div>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analyticsData.monthlyPatients} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0c7fe4" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#0c7fe4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradDischarged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
              <Area type="monotone" dataKey="patients" name="Admissions" stroke="#0c7fe4" strokeWidth={2} fill="url(#gradPatients)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
              <Area type="monotone" dataKey="discharged" name="Discharged" stroke="#22c55e" strokeWidth={2} fill="url(#gradDischarged)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Weekly bar chart */}
        <Card className="lg:col-span-3" padding="none">
          <div className="px-5 pt-5 pb-4 border-b border-surface-100">
            <h3 className="font-display text-sm font-bold text-surface-900">Weekly Admissions</h3>
            <p className="text-xs text-surface-400 mt-0.5">Day-by-day breakdown</p>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={analyticsData.weeklyAdmissions} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <Bar dataKey="admissions" name="Admissions" fill="#0c7fe4" radius={[4, 4, 0, 0]} maxBarSize={32} />
                <Bar dataKey="discharges" name="Discharges" fill="#e2e8f0" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie chart */}
        <Card className="lg:col-span-2" padding="none">
          <div className="px-5 pt-5 pb-4 border-b border-surface-100">
            <h3 className="font-display text-sm font-bold text-surface-900">Patient Status</h3>
            <p className="text-xs text-surface-400 mt-0.5">Current distribution</p>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={analyticsData.statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={68} labelLine={false} label={renderCustomizedLabel}>
                  {analyticsData.statusDistribution.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {analyticsData.statusDistribution.map(s => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-[10px] text-surface-500 truncate">{s.name}</span>
                  <span className="text-[10px] font-bold text-surface-700 ml-auto">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Condition distribution */}
      <Card padding="none">
        <div className="px-5 pt-5 pb-4 border-b border-surface-100">
          <h3 className="font-display text-sm font-bold text-surface-900">Condition Distribution</h3>
          <p className="text-xs text-surface-400 mt-0.5">Patients by primary diagnosis</p>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyticsData.conditionDistribution.map(c => {
            const pct = Math.round((c.count / analyticsData.conditionDistribution.reduce((s, x) => s + x.count, 0)) * 100);
            return (
              <div key={c.condition} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-surface-100">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c.color}15` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-surface-700 truncate">{c.condition}</p>
                    <p className="text-xs font-bold text-surface-900 ml-2">{c.count}</p>
                  </div>
                  <div className="h-1 bg-surface-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: c.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

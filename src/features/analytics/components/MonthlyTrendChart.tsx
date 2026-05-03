import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../../../components/ui/Card';
import { CustomTooltip } from '../utils/chartUtils';

interface MonthlyTrendChartProps {
  data: any[];
}

export const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ data }) => (
  <Card padding="none">
    <div className="px-5 pt-5 pb-4 border-b border-surface-100">
      <h3 className="font-display text-sm font-bold text-surface-900">Monthly Patient Flow</h3>
      <p className="text-xs text-surface-400 mt-0.5">Admissions vs discharges over 12 months</p>
    </div>
    <div className="p-5">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
);

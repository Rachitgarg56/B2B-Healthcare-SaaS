import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../../../components/ui/Card';
import { CustomTooltip } from '../utils/chartUtils';

interface WeeklyAdmissionsChartProps {
  data: any[];
}

export const WeeklyAdmissionsChart: React.FC<WeeklyAdmissionsChartProps> = ({ data }) => (
  <Card className="lg:col-span-3" padding="none">
    <div className="px-5 pt-5 pb-4 border-b border-surface-100">
      <h3 className="font-display text-sm font-bold text-surface-900">Weekly Admissions</h3>
      <p className="text-xs text-surface-400 mt-0.5">Day-by-day breakdown</p>
    </div>
    <div className="p-5">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
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
);

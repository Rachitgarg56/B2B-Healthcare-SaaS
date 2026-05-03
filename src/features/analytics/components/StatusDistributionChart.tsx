import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../../../components/ui/Card';
import { CustomTooltip, renderCustomizedLabel } from '../utils/chartUtils';

interface StatusDistributionChartProps {
  data: any[];
}

export const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({ data }) => (
  <Card className="lg:col-span-2" padding="none">
    <div className="px-5 pt-5 pb-4 border-b border-surface-100">
      <h3 className="font-display text-sm font-bold text-surface-900">Patient Status</h3>
      <p className="text-xs text-surface-400 mt-0.5">Current distribution</p>
    </div>
    <div className="p-5">
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={68}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {data.map((s) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[10px] text-surface-500 truncate">{s.name}</span>
            <span className="text-[10px] font-bold text-surface-700 ml-auto">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

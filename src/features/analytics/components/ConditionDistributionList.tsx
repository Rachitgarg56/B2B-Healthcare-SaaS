import React from 'react';
import { Card } from '../../../components/ui/Card';

interface ConditionDistributionListProps {
  data: any[];
}

export const ConditionDistributionList: React.FC<ConditionDistributionListProps> = ({ data }) => (
  <Card padding="none">
    <div className="px-5 pt-5 pb-4 border-b border-surface-100">
      <h3 className="font-display text-sm font-bold text-surface-900">Condition Distribution</h3>
      <p className="text-xs text-surface-400 mt-0.5">Patients by primary diagnosis</p>
    </div>
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((c) => (
        <div key={c.condition} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-surface-100">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${c.color}15` }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-surface-700 truncate">{c.condition}</p>
              <p className="text-xs font-bold text-surface-900 ml-2">{c.count}</p>
            </div>
            <div className="h-1 bg-surface-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

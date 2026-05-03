import React from 'react';
import { Card } from '../../../components/ui/Card';
import { WARD_DATA } from '../constants';

export const WardOccupancy: React.FC = () => (
  <Card padding="md">
    <h3 className="font-display text-sm font-bold text-surface-900 mb-4">Ward Occupancy</h3>
    <div className="space-y-3">
      {WARD_DATA.map(({ ward, used, total, color }) => (
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
);

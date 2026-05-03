import React from 'react';
import { QUICK_METRICS } from '../constants';

export const MetricsRow: React.FC = () => (
  <div className="grid grid-cols-3 gap-4">
    {QUICK_METRICS.map(m => (
      <div key={m.label} className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-surface-50 flex items-center justify-center flex-shrink-0 border border-surface-200">{m.icon}</div>
        <div className="min-w-0">
          <p className="text-lg font-display font-bold text-surface-900">{m.value}</p>
          <p className="text-[10px] text-surface-400 truncate">{m.label}</p>
        </div>
      </div>
    ))}
  </div>
);

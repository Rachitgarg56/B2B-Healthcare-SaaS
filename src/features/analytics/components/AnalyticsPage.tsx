import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { KPI_CONFIGS } from '../constants';
import { MonthlyTrendChart } from './MonthlyTrendChart';
import { WeeklyAdmissionsChart } from './WeeklyAdmissionsChart';
import { StatusDistributionChart } from './StatusDistributionChart';
import { ConditionDistributionList } from './ConditionDistributionList';

export const AnalyticsPage: React.FC = () => {
  const { 
    kpis, 
    monthlyPatients, 
    weeklyAdmissions, 
    statusDistribution, 
    conditionDistribution 
  } = useAnalyticsData();

  return (
    <div className="space-y-6 page-enter">
      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {KPI_CONFIGS.map((k) => {
          const Icon = k.icon;
          return (
            <div 
              key={k.key} 
              className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-4 hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-xl ${k.bg} flex items-center justify-center`}>
                  <Icon size={16} className={k.color.replace('text', 'text')} />
                </div>
              </div>
              <p className="text-xl font-display font-bold text-surface-900">
                {k.getValue(kpis)}
              </p>
              <p className="text-[10px] text-surface-400 mt-0.5">{k.label}</p>
              <p className={`text-[10px] font-semibold mt-1 ${k.color}`}>{k.sub}</p>
            </div>
          );
        })}
      </div>

      <MonthlyTrendChart data={monthlyPatients} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <WeeklyAdmissionsChart data={weeklyAdmissions} />
        <StatusDistributionChart data={statusDistribution} />
      </div>

      <ConditionDistributionList data={conditionDistribution} />
    </div>
  );
};

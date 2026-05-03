import React from 'react';
import { Users, Activity, TrendingUp, ArrowUpRight, LucideIcon } from 'lucide-react';

export interface KPIConfig {
  key: string;
  label: string;
  getValue: (data: any) => string | number;
  sub: string;
  color: string;
  icon: LucideIcon;
  bg: string;
}

export const KPI_CONFIGS: KPIConfig[] = [
  { 
    key: 'totalPatients',
    label: 'Total Patients', 
    getValue: (data) => data.totalPatients, 
    sub: '+12.5% MoM', 
    color: 'text-primary-600', 
    icon: Users, 
    bg: 'bg-primary-50' 
  },
  { 
    key: 'avgAge',
    label: 'Avg Patient Age', 
    getValue: (data) => `${data.avgAge} yrs`, 
    sub: 'All demographics', 
    color: 'text-violet-600', 
    icon: Activity, 
    bg: 'bg-violet-50' 
  },
  { 
    key: 'growth',
    label: 'Monthly Growth', 
    getValue: () => '11.8%', 
    sub: 'Admissions trend', 
    color: 'text-teal-600', 
    icon: TrendingUp, 
    bg: 'bg-teal-50' 
  },
  { 
    key: 'criticalRate',
    label: 'Critical Rate', 
    getValue: (data) => `${data.criticalPct}%`, 
    sub: 'Needs monitoring', 
    color: 'text-danger-600', 
    icon: ArrowUpRight, 
    bg: 'bg-danger-50' 
  },
];

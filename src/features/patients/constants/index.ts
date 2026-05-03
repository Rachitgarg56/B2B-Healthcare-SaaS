import { mockPatients } from '../../../lib/mockData';

export const CONDITIONS = ['all', ...Array.from(new Set(mockPatients.map(p => p.condition))).sort()];
export const STATUSES = ['all', 'active', 'stable', 'critical', 'recovered', 'discharged'];

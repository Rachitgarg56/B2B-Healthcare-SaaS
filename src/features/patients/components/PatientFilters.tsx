import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { STATUSES, CONDITIONS } from '../constants';

interface PatientFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterCondition: string;
  setFilterCondition: (condition: string) => void;
  clearFilters: () => void;
}

export const PatientFilters: React.FC<PatientFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  filterCondition,
  setFilterCondition,
  clearFilters,
}) => {
  const hasFilters = searchQuery || filterStatus !== 'all' || filterCondition !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-surface-200/80 shadow-card p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search by name, ID, doctor, or condition…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-surface-400 flex-shrink-0" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="h-9 pl-3 pr-8 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 appearance-none transition-all cursor-pointer"
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>
                {s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterCondition}
            onChange={e => setFilterCondition(e.target.value)}
            className="h-9 pl-3 pr-8 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 appearance-none transition-all cursor-pointer hidden sm:block"
          >
            {CONDITIONS.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Conditions' : c}
              </option>
            ))}
          </select>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

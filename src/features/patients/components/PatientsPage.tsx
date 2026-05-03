import React from 'react';
import { Plus, Users } from 'lucide-react';
import { ViewToggle } from '../../../components/ui/Toggle';
import { PatientCard } from './PatientCard';
import { PatientTable } from './PatientTable';
import { PatientDrawer } from './PatientDrawer';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { usePatients } from '../hooks/usePatients';
import { PatientFilters } from './PatientFilters';

export const PatientsPage: React.FC = () => {
  const {
    viewMode, setViewMode, searchQuery, setSearchQuery,
    filterStatus, setFilterStatus, filterCondition, setFilterCondition,
    selectedPatient, setSelectedPatient, filtered, total,
    handleAddDemo, clearFilters
  } = usePatients();

  return (
    <div className="space-y-5 page-enter">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
            <Users size={15} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-surface-900">{total} Patients</p>
            <p className="text-[10px] text-surface-400">{filtered.length} shown</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ViewToggle value={viewMode} onChange={setViewMode} />
          <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={handleAddDemo}>Add Patient</Button>
        </div>
      </div>

      <PatientFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        clearFilters={clearFilters}
      />

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users size={22} />}
          title="No patients found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={<Button variant="outline" size="sm" onClick={clearFilters}>Clear filters</Button>}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => <PatientCard key={p.id} patient={p} onClick={() => setSelectedPatient(p)} />)}
        </div>
      ) : (
        <PatientTable patients={filtered} onSelect={setSelectedPatient} />
      )}

      {/* Detail drawer */}
      <PatientDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    </div>
  );
};

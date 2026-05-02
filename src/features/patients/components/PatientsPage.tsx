import React, { useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Users } from 'lucide-react';
import { usePatientStore } from '../../../stores/patientStore';
import { useNotificationStore } from '../../../stores/notificationStore';
import { ViewToggle } from '../../../components/ui/Toggle';
import { PatientCard } from './PatientCard';
import { PatientTable } from './PatientTable';
import { PatientDrawer } from './PatientDrawer';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { mockPatients } from '../../../lib/mockData';
import { Patient } from '../../../types';

const CONDITIONS = ['all', ...Array.from(new Set(mockPatients.map(p => p.condition))).sort()];
const STATUSES = ['all', 'active', 'stable', 'critical', 'recovered', 'discharged'];

export const PatientsPage: React.FC = () => {
  const {
    viewMode, setViewMode, searchQuery, setSearchQuery,
    filterStatus, setFilterStatus, filterCondition, setFilterCondition,
    selectedPatient, setSelectedPatient, getFilteredPatients, addPatient,
  } = usePatientStore();
  const { addNotification } = useNotificationStore();

  const filtered = getFilteredPatients();
  const total = usePatientStore(s => s.patients.length);

  const handleAddDemo = () => {
    const newPat: Patient = {
      id: `PAT-${Date.now().toString().slice(-4)}`,
      name: 'New Demo Patient',
      age: 35, gender: 'Male', bloodGroup: 'O+',
      condition: 'Hypertension', status: 'active',
      doctor: 'Dr. Priya Sharma', ward: 'General',
      admissionDate: new Date().toISOString().split('T')[0],
      phone: '+91 9876543210', email: 'demo@patient.com',
      address: '123, MG Road, Delhi', lastVisit: new Date().toISOString().split('T')[0],
      avatar: '', vitals: { heartRate: 82, bloodPressure: '128/84', temperature: 37.1, oxygenLevel: 98 },
      medications: ['Lisinopril'],
    };
    addPatient(newPat);
    addNotification({ title: 'New Patient Added', message: `${newPat.name} has been registered successfully.`, type: 'success' });
    // Trigger push notification via service worker
    if ('serviceWorker' in navigator && 'Notification' in window && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification('New Patient Added', {
          body: `${newPat.name} has been registered in the system.`,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: 'new-patient',
        });
      });
    }
  };

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

      {/* Filters */}
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
              {STATUSES.map(s => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select
              value={filterCondition}
              onChange={e => setFilterCondition(e.target.value)}
              className="h-9 pl-3 pr-8 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 appearance-none transition-all cursor-pointer hidden sm:block"
            >
              {CONDITIONS.map(c => <option key={c} value={c}>{c === 'all' ? 'All Conditions' : c}</option>)}
            </select>
            {(searchQuery || filterStatus !== 'all' || filterCondition !== 'all') && (
              <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); setFilterStatus('all'); setFilterCondition('all'); }}>Clear</Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users size={22} />}
          title="No patients found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={<Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setFilterStatus('all'); setFilterCondition('all'); }}>Clear filters</Button>}
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

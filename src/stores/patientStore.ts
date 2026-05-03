import { create } from 'zustand';
import { Patient, ViewMode } from '../types';
import { mockPatients } from '../lib/mockData';

interface PatientState {
  patients: Patient[];
  viewMode: ViewMode;
  searchQuery: string;
  filterStatus: string;
  filterCondition: string;
  selectedPatient: Patient | null;
  loading: boolean;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterCondition: (condition: string) => void;
  setSelectedPatient: (patient: Patient | null) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  removePatient: (id: string) => void;
  getFilteredPatients: () => Patient[];
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: mockPatients,
  viewMode: 'grid',
  searchQuery: '',
  filterStatus: 'all',
  filterCondition: 'all',
  selectedPatient: null,
  loading: false,
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterCondition: (condition) => set({ filterCondition: condition }),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  addPatient: (patient) => set((s) => ({ patients: [patient, ...s.patients] })),
  updatePatient: (id, updates) =>
    set((s) => {
      const updatedPatients = s.patients.map((p) => (p.id === id ? { ...p, ...updates } : p));
      const updatedSelected = s.selectedPatient?.id === id 
        ? { ...s.selectedPatient, ...updates } 
        : s.selectedPatient;
      return { patients: updatedPatients, selectedPatient: updatedSelected };
    }),
  removePatient: (id) =>
    set((s) => ({
      patients: s.patients.filter((p) => p.id !== id),
      selectedPatient: s.selectedPatient?.id === id ? null : s.selectedPatient,
    })),
  getFilteredPatients: () => {
    const { patients, searchQuery, filterStatus, filterCondition } = get();
    return patients.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      const matchesCondition = filterCondition === 'all' || p.condition === filterCondition;
      return matchesSearch && matchesStatus && matchesCondition;
    });
  },
}));

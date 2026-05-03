import { usePatientStore } from '../../../stores/patientStore';
import { useNotificationStore } from '../../../stores/notificationStore';
import { Patient } from '../../../types';

export const usePatients = () => {
  const {
    viewMode, setViewMode, searchQuery, setSearchQuery,
    filterStatus, setFilterStatus, filterCondition, setFilterCondition,
    selectedPatient, setSelectedPatient, getFilteredPatients, addPatient,
    patients
  } = usePatientStore();
  
  const { addNotification } = useNotificationStore();

  const filtered = getFilteredPatients();
  const total = patients.length;

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

  const clearFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterCondition('all');
  };

  return {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterCondition,
    setFilterCondition,
    selectedPatient,
    setSelectedPatient,
    filtered,
    total,
    handleAddDemo,
    clearFilters
  };
};

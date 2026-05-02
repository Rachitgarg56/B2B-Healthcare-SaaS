export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type PatientStatus = 'active' | 'stable' | 'critical' | 'recovered' | 'discharged';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Gender = 'Male' | 'Female' | 'Other';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  condition: string;
  status: PatientStatus;
  doctor: string;
  ward: string;
  admissionDate: string;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  avatar: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenLevel: number;
  };
  medications: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export type ViewMode = 'grid' | 'list';

export interface AnalyticsData {
  monthlyPatients: { month: string; patients: number; discharged: number }[];
  conditionDistribution: { condition: string; count: number; color: string }[];
  weeklyAdmissions: { day: string; admissions: number; discharges: number }[];
  statusDistribution: { name: string; value: number; color: string }[];
}

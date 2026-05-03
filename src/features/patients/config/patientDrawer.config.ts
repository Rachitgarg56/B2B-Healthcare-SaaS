import { Phone, Mail, MapPin, Droplets, Heart, Thermometer, Activity } from 'lucide-react';
import { Patient } from '../../../types';
import { safeFormat } from '../../../lib/utils';

export const getVitalsConfig = (patient: Patient) => [
  { icon: Heart, label: 'Heart Rate', value: `${patient.vitals.heartRate} bpm`, alert: patient.vitals.heartRate > 100 || patient.vitals.heartRate < 60 },
  { icon: Activity, label: 'Blood Pressure', value: patient.vitals.bloodPressure, alert: false },
  { icon: Thermometer, label: 'Temperature', value: `${patient.vitals.temperature}°C`, alert: patient.vitals.temperature > 37.5 },
  { icon: Droplets, label: 'SpO₂', value: `${patient.vitals.oxygenLevel}%`, alert: patient.vitals.oxygenLevel < 95 },
];

export const getClinicalInfo = (patient: Patient) => [
  { label: 'Primary Condition', value: patient.condition },
  { label: 'Attending Doctor', value: patient.doctor },
  { label: 'Ward / Unit', value: patient.ward },
  { label: 'Admission Date', value: safeFormat(patient.admissionDate) },
  { label: 'Last Visit', value: safeFormat(patient.lastVisit) },
];

export const getContactInfo = (patient: Patient) => [
  { icon: Phone, value: patient.phone },
  { icon: Mail, value: patient.email },
  { icon: MapPin, value: patient.address },
];

import React from 'react';
import { Stethoscope, Clock, Heart } from 'lucide-react';

export const QUICK_METRICS = [
  { label: 'Bed Occupancy', value: '78%', color: 'bg-primary-500', icon: <Stethoscope size={14} className="text-primary-600" /> },
  { label: 'Avg Stay (days)', value: '4.2', color: 'bg-teal-500', icon: <Clock size={14} className="text-teal-600" /> },
  { label: 'Recovery Rate', value: '94%', color: 'bg-success-500', icon: <Heart size={14} className="text-success-600" /> },
];

export const WARD_DATA = [
  { ward: 'ICU', used: 8, total: 10, color: 'bg-danger-500' },
  { ward: 'Cardiology', used: 18, total: 24, color: 'bg-primary-500' },
  { ward: 'General', used: 32, total: 48, color: 'bg-success-500' },
  { ward: 'Orthopedic', used: 11, total: 16, color: 'bg-violet-500' },
];

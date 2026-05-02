import React from 'react';
import { clsx } from 'clsx';
import { X, Phone, Mail, MapPin, Droplets, Heart, Thermometer, Activity, Pill } from 'lucide-react';
import { Patient } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { format, parseISO } from 'date-fns';

interface PatientDrawerProps {
  patient: Patient | null;
  onClose: () => void;
}

function safeFormat(d: string) {
  try { return format(parseISO(d), 'MMM d, yyyy'); } catch { return d; }
}

export const PatientDrawer: React.FC<PatientDrawerProps> = ({ patient, onClose }) => {
  return (
    <>
      {patient && <div className="fixed inset-0 bg-surface-900/30 backdrop-blur-sm z-40" onClick={onClose} />}
      <div className={clsx(
        'fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out',
        patient ? 'translate-x-0' : 'translate-x-full',
      )}>
        {patient && (
          <>
            {/* Header */}
            <div className={clsx(
              'p-5 border-b border-surface-100',
              patient.status === 'critical' ? 'bg-danger-50' : patient.status === 'active' ? 'bg-primary-50' : 'bg-surface-50',
            )}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar name={patient.name} size="lg" />
                  <div>
                    <h2 className="font-display text-lg font-bold text-surface-900">{patient.name}</h2>
                    <p className="text-xs font-mono text-surface-400">{patient.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="xs" onClick={onClose} icon={<X size={14} />} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={patient.status} dot pulse={patient.status === 'critical'}>{patient.status}</Badge>
                <span className="text-xs text-surface-500">{patient.age}y · {patient.gender} · {patient.bloodGroup}</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-5">
              {/* Vitals */}
              <section>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">Vitals</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Heart size={14} />, label: 'Heart Rate', value: `${patient.vitals.heartRate} bpm`, alert: patient.vitals.heartRate > 100 || patient.vitals.heartRate < 60 },
                    { icon: <Activity size={14} />, label: 'Blood Pressure', value: patient.vitals.bloodPressure, alert: false },
                    { icon: <Thermometer size={14} />, label: 'Temperature', value: `${patient.vitals.temperature}°C`, alert: patient.vitals.temperature > 37.5 },
                    { icon: <Droplets size={14} />, label: 'SpO₂', value: `${patient.vitals.oxygenLevel}%`, alert: patient.vitals.oxygenLevel < 95 },
                  ].map(v => (
                    <div key={v.label} className={clsx('rounded-xl p-3 border', v.alert ? 'bg-danger-50 border-danger-200' : 'bg-surface-50 border-surface-200')}>
                      <div className={clsx('flex items-center gap-1.5 mb-1', v.alert ? 'text-danger-500' : 'text-surface-400')}>
                        {v.icon}
                        <span className="text-[10px] font-semibold uppercase tracking-wide">{v.label}</span>
                      </div>
                      <p className={clsx('text-lg font-display font-bold', v.alert ? 'text-danger-700' : 'text-surface-900')}>{v.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Clinical info */}
              <section>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">Clinical Details</h3>
                <div className="bg-surface-50 rounded-xl border border-surface-200 divide-y divide-surface-200">
                  {[
                    { label: 'Primary Condition', value: patient.condition },
                    { label: 'Attending Doctor', value: patient.doctor },
                    { label: 'Ward / Unit', value: patient.ward },
                    { label: 'Admission Date', value: safeFormat(patient.admissionDate) },
                    { label: 'Last Visit', value: safeFormat(patient.lastVisit) },
                  ].map(r => (
                    <div key={r.label} className="flex items-start justify-between px-3.5 py-2.5 gap-3">
                      <p className="text-xs text-surface-400 flex-shrink-0">{r.label}</p>
                      <p className="text-xs font-semibold text-surface-800 text-right">{r.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Medications */}
              <section>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">Medications</h3>
                <div className="flex flex-wrap gap-2">
                  {patient.medications.map(med => (
                    <div key={med} className="flex items-center gap-1.5 bg-violet-50 border border-violet-200 text-violet-700 rounded-lg px-2.5 py-1.5">
                      <Pill size={11} />
                      <span className="text-xs font-medium">{med}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact */}
              <section>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">Contact</h3>
                <div className="space-y-2.5">
                  {[
                    { icon: <Phone size={13} />, value: patient.phone },
                    { icon: <Mail size={13} />, value: patient.email },
                    { icon: <MapPin size={13} />, value: patient.address },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-surface-600">
                      <span className="text-surface-400 mt-0.5 flex-shrink-0">{c.icon}</span>
                      <span>{c.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer actions */}
            <div className="border-t border-surface-100 p-4 flex gap-2">
              <Button variant="primary" size="sm" fullWidth>Schedule Appointment</Button>
              <Button variant="outline" size="sm">Print Record</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

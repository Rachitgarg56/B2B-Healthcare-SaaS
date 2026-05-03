import React, { useEffect, memo } from 'react';
import { clsx } from 'clsx';
import { X, Pill, LucideIcon } from 'lucide-react';
import { Patient } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { getVitalsConfig, getClinicalInfo, getContactInfo } from '../config/patientDrawer.config';

interface PatientDrawerProps {
  patient: Patient | null;
  onClose: () => void;
}

// Internal Reusable Components optimized with memo
const Section = memo(({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">{title}</h3>
    {children}
  </section>
));

const VitalCard = memo(({ icon: Icon, label, value, alert }: { icon: LucideIcon; label: string; value: string; alert: boolean }) => (
  <div className={clsx('rounded-xl p-3 border', alert ? 'bg-danger-50 border-danger-200' : 'bg-surface-50 border-surface-200')}>
    <div className={clsx('flex items-center gap-1.5 mb-1', alert ? 'text-danger-500' : 'text-surface-400')}>
      <Icon size={14} />
      <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
    </div>
    <p className={clsx('text-lg font-display font-bold', alert ? 'text-danger-700' : 'text-surface-900')}>{value}</p>
  </div>
));

const DetailRow = memo(({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between px-3.5 py-2.5 gap-3">
    <p className="text-xs text-surface-400 flex-shrink-0">{label}</p>
    <p className="text-xs font-semibold text-surface-800 text-right">{value}</p>
  </div>
));

const ContactRow = memo(({ icon: Icon, value }: { icon: LucideIcon; value: string }) => (
  <div className="flex items-start gap-2.5 text-xs text-surface-600">
    <span className="text-surface-400 mt-0.5 flex-shrink-0">
      <Icon size={13} />
    </span>
    <span>{value}</span>
  </div>
));

export const PatientDrawer: React.FC<PatientDrawerProps> = ({ patient, onClose }) => {
  // Accessibility: Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (patient) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [patient, onClose]);

  return (
    <>
      {patient && (
        <div 
          className="fixed inset-0 bg-surface-900/30 backdrop-blur-sm z-40" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-drawer-title"
        className={clsx(
          'fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out',
          patient ? 'translate-x-0' : 'translate-x-full',
        )}
      >
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
                    <h2 id="patient-drawer-title" className="font-display text-lg font-bold text-surface-900">{patient.name}</h2>
                    <p className="text-xs font-mono text-surface-400">{patient.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="xs" onClick={onClose} icon={<X size={14} />} aria-label="Close drawer" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={patient.status} dot pulse={patient.status === 'critical'}>{patient.status}</Badge>
                <span className="text-xs text-surface-500">{patient.age}y · {patient.gender} · {patient.bloodGroup}</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-5">
              <Section title="Vitals">
                <div className="grid grid-cols-2 gap-3">
                  {getVitalsConfig(patient).map(v => (
                    <VitalCard key={v.label} {...v} />
                  ))}
                </div>
              </Section>

              <Section title="Clinical Details">
                <div className="bg-surface-50 rounded-xl border border-surface-200 divide-y divide-surface-200">
                  {getClinicalInfo(patient).map(r => (
                    <DetailRow key={r.label} {...r} />
                  ))}
                </div>
              </Section>

              <Section title="Medications">
                <div className="flex flex-wrap gap-2">
                  {patient.medications.map(med => (
                    <div key={med} className="flex items-center gap-1.5 bg-violet-50 border border-violet-200 text-violet-700 rounded-lg px-2.5 py-1.5">
                      <Pill size={11} />
                      <span className="text-xs font-medium">{med}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Contact">
                <div className="space-y-2.5">
                  {getContactInfo(patient).map((c, i) => (
                    <ContactRow key={i} icon={c.icon} value={c.value} />
                  ))}
                </div>
              </Section>
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

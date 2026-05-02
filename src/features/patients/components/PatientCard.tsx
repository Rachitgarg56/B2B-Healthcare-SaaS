import React from 'react';
import { Patient } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { Heart, Thermometer, Droplets, Activity } from 'lucide-react';
import { clsx } from 'clsx';

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  const statusColor: Record<string, string> = {
    critical: 'border-l-danger-500',
    active: 'border-l-primary-500',
    stable: 'border-l-success-500',
    recovered: 'border-l-teal-500',
    discharged: 'border-l-surface-300',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-2xl border border-surface-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden border-l-[3px]',
        statusColor[patient.status] || 'border-l-surface-200',
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar name={patient.name} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-surface-900 truncate">{patient.name}</p>
              <p className="text-[10px] font-mono text-surface-400">{patient.id}</p>
            </div>
          </div>
          <Badge variant={patient.status} dot>{patient.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
          <InfoRow label="Age" value={`${patient.age} yrs`} />
          <InfoRow label="Gender" value={patient.gender} />
          <InfoRow label="Blood" value={patient.bloodGroup} />
          <InfoRow label="Ward" value={patient.ward} />
          <InfoRow label="Condition" value={patient.condition} className="col-span-2" />
          <InfoRow label="Doctor" value={patient.doctor} className="col-span-2" />
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-surface-100">
          <Vital icon={<Heart size={10} />} value={patient.vitals.heartRate} unit="bpm" label="HR" alert={patient.vitals.heartRate > 100 || patient.vitals.heartRate < 60} />
          <Vital icon={<Activity size={10} />} value={patient.vitals.bloodPressure} label="BP" />
          <Vital icon={<Thermometer size={10} />} value={patient.vitals.temperature} unit="°C" label="Temp" alert={patient.vitals.temperature > 37.5} />
          <Vital icon={<Droplets size={10} />} value={patient.vitals.oxygenLevel} unit="%" label="SpO₂" alert={patient.vitals.oxygenLevel < 95} />
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className }) => (
  <div className={clsx('min-w-0', className)}>
    <p className="text-[9px] uppercase tracking-wide text-surface-400 font-semibold">{label}</p>
    <p className="text-xs text-surface-700 font-medium truncate">{value}</p>
  </div>
);

const Vital: React.FC<{ icon: React.ReactNode; value: string | number; unit?: string; label: string; alert?: boolean }> = ({ icon, value, unit, label, alert }) => (
  <div className={clsx('rounded-lg p-1.5 text-center', alert ? 'bg-danger-50' : 'bg-surface-50')}>
    <div className={clsx('flex items-center justify-center gap-0.5 mb-0.5', alert ? 'text-danger-500' : 'text-surface-400')}>{icon}</div>
    <p className={clsx('text-[10px] font-bold leading-none', alert ? 'text-danger-600' : 'text-surface-800')}>{value}{unit}</p>
    <p className="text-[8px] text-surface-400 mt-0.5">{label}</p>
  </div>
);

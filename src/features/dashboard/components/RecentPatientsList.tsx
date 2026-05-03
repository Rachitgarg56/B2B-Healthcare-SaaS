import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Patient } from '../../../types';
import { format, parseISO, isToday, isYesterday } from 'date-fns';

interface RecentPatientsListProps {
  patients: Patient[];
}

function formatVisitDate(dateStr: string) {
  try {
    const d = parseISO(dateStr);
    if (isToday(d)) return 'Today';
    if (isYesterday(d)) return 'Yesterday';
    return format(d, 'MMM d');
  } catch { return dateStr; }
}

export const RecentPatientsList: React.FC<RecentPatientsListProps> = ({ patients }) => (
  <Card className="lg:col-span-2" padding="none">
    <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-surface-100">
      <div>
        <h3 className="font-display text-sm font-bold text-surface-900">Recent Admissions</h3>
        <p className="text-xs text-surface-400 mt-0.5">Latest patient records</p>
      </div>
      <Link to="/patients">
        <Button variant="ghost" size="xs" iconRight={<ArrowRight size={12} />}>View all</Button>
      </Link>
    </div>
    <div className="divide-y divide-surface-100">
      {patients.map(patient => (
        <div key={patient.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-50 transition-colors">
          <Avatar name={patient.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-surface-900 truncate">{patient.name}</p>
              <span className="text-[10px] font-mono text-surface-400 hidden sm:block">{patient.id}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-xs text-surface-400">{patient.condition}</p>
              <span className="text-surface-300">·</span>
              <p className="text-xs text-surface-400">{patient.doctor}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <Badge variant={patient.status} dot>{patient.status}</Badge>
            <p className="text-[10px] text-surface-400">{formatVisitDate(patient.admissionDate)}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

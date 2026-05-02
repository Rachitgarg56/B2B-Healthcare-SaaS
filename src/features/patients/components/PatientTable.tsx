import React from 'react';
import { Patient } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { ChevronRight, Heart } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients, onSelect }) => (
  <div className="bg-white rounded-2xl border border-surface-200/80 shadow-card overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-50 border-b border-surface-200">
            {['Patient', 'ID', 'Condition', 'Status', 'Doctor', 'Ward', 'Heart Rate', ''].map(h => (
              <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-surface-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100">
          {patients.map(p => (
            <tr key={p.id} onClick={() => onSelect(p)} className="hover:bg-surface-50 cursor-pointer transition-colors group">
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Avatar name={p.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-surface-900 whitespace-nowrap">{p.name}</p>
                    <p className="text-[10px] text-surface-400">{p.age}y · {p.gender}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5"><span className="text-xs font-mono text-surface-500 bg-surface-100 px-2 py-0.5 rounded">{p.id}</span></td>
              <td className="px-4 py-3.5"><p className="text-xs text-surface-600 whitespace-nowrap">{p.condition}</p></td>
              <td className="px-4 py-3.5"><Badge variant={p.status} dot>{p.status}</Badge></td>
              <td className="px-4 py-3.5"><p className="text-xs text-surface-600 whitespace-nowrap">{p.doctor}</p></td>
              <td className="px-4 py-3.5"><span className="text-xs text-surface-500 bg-surface-100 px-2 py-0.5 rounded-full">{p.ward}</span></td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1">
                  <Heart size={11} className={p.vitals.heartRate > 100 ? 'text-danger-500' : 'text-surface-400'} />
                  <span className={`text-xs font-medium ${p.vitals.heartRate > 100 ? 'text-danger-600' : 'text-surface-600'}`}>{p.vitals.heartRate} bpm</span>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <ChevronRight size={14} className="text-surface-300 group-hover:text-surface-500 transition-colors" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

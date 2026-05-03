import React, { useEffect, useState, memo } from 'react';
import { clsx } from 'clsx';
import { X, Pill, LucideIcon, Edit2, Save, ArrowLeft, Trash2 } from 'lucide-react';
import { Patient } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { getVitalsConfig, getClinicalInfo, getContactInfo } from '../config/patientDrawer.config';
import { usePatientForm } from '../hooks/usePatientForm';
import { usePatientStore } from '../../../stores/patientStore';
import { useNotificationStore } from '../../../stores/notificationStore';
import { useToast } from '../../../components/ui/Toast';

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
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { removePatient } = usePatientStore();
  const { addNotification } = useNotificationStore();
  const { toast } = useToast();

  const { 
    formData, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleSubmit,
    setFormData 
  } = usePatientForm(patient, () => setIsEditing(false));

  // Sync form data when patient changes
  useEffect(() => {
    setFormData(patient);
    setIsEditing(false);
  }, [patient, setFormData]);

  // Accessibility: Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) setShowDeleteConfirm(false);
        else if (isEditing) setIsEditing(false);
        else onClose();
      }
    };
    if (patient) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [patient, onClose, isEditing, showDeleteConfirm]);

  const handleDelete = async () => {
    if (!patient) return;
    setIsDeleting(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      removePatient(patient.id);
      addNotification({
        title: 'Patient Deleted',
        message: `${patient.name} has been removed from the system.`,
        type: 'success',
      });
      toast(`${patient.name} deleted`, 'success');
      setShowDeleteConfirm(false);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  if (!patient) return null;

  return (
    <>
      <div 
        className={clsx(
          "fixed inset-0 bg-surface-900/30 backdrop-blur-sm z-40 transition-opacity duration-300",
          patient ? "opacity-100" : "opacity-0 pointer-events-none"
        )} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-drawer-title"
        className={clsx(
          'fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out',
          patient ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className={clsx(
          'p-5 border-b border-surface-100 transition-colors duration-300',
          formData?.status === 'critical' ? 'bg-danger-50' : formData?.status === 'active' ? 'bg-primary-50' : 'bg-surface-50',
        )}>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Avatar name={formData?.name || ''} size="lg" />
              <div>
                <h2 id="patient-drawer-title" className="font-display text-lg font-bold text-surface-900">
                  {isEditing ? 'Edit Records' : formData?.name}
                </h2>
                <p className="text-xs font-mono text-surface-400">{formData?.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isEditing && (
                <>
                  <Button 
                    variant="ghost" 
                    size="xs" 
                    onClick={() => setIsEditing(true)} 
                    icon={<Edit2 size={14} />} 
                    aria-label="Edit patient" 
                  />
                  <Button 
                    variant="ghost" 
                    size="xs" 
                    className="text-danger-500 hover:bg-danger-50 hover:text-danger-600"
                    onClick={() => setShowDeleteConfirm(true)} 
                    icon={<Trash2 size={14} />} 
                    aria-label="Delete patient" 
                  />
                </>
              )}
              <Button variant="ghost" size="xs" onClick={onClose} icon={<X size={14} />} aria-label="Close drawer" />
            </div>
          </div>
          {!isEditing && formData && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={formData.status} dot pulse={formData.status === 'critical'}>{formData.status}</Badge>
              <span className="text-xs text-surface-500">{formData.age}y · {formData.gender} · {formData.bloodGroup}</span>
            </div>
          )}
          {isEditing && (
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1.5 text-xs font-medium text-surface-500 hover:text-surface-700 transition-colors"
            >
              <ArrowLeft size={12} />
              Back to details
            </button>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-6">
          {!isEditing && formData ? (
            <>
              <Section title="Vitals">
                <div className="grid grid-cols-2 gap-3">
                  {getVitalsConfig(formData).map(v => (
                    <VitalCard key={v.label} {...v} />
                  ))}
                </div>
              </Section>

              <Section title="Clinical Details">
                <div className="bg-surface-50 rounded-xl border border-surface-200 divide-y divide-surface-200">
                  {getClinicalInfo(formData).map(r => (
                    <DetailRow key={r.label} {...r} />
                  ))}
                </div>
              </Section>

              <Section title="Medications">
                <div className="flex flex-wrap gap-2">
                  {formData.medications.map(med => (
                    <div key={med} className="flex items-center gap-1.5 bg-violet-50 border border-violet-200 text-violet-700 rounded-lg px-2.5 py-1.5">
                      <Pill size={11} />
                      <span className="text-xs font-medium">{med}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Contact">
                <div className="space-y-2.5">
                  {getContactInfo(formData).map((c, i) => (
                    <ContactRow key={i} icon={c.icon} value={c.value} />
                  ))}
                </div>
              </Section>
            </>
          ) : (
            <form id="edit-patient-form" onSubmit={handleSubmit} className="space-y-5">
              <Section title="Basic Information">
                <div className="space-y-3">
                  <Input 
                    label="Full Name" 
                    value={formData?.name} 
                    onChange={e => handleChange('name', e.target.value)}
                    error={errors.name}
                    fullWidth
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      label="Age" 
                      type="number"
                      value={formData?.age} 
                      onChange={e => handleChange('age', parseInt(e.target.value))}
                      fullWidth
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-surface-700">Status</label>
                      <select 
                        className="w-full h-10 bg-white border border-surface-200 rounded-lg text-sm px-3.5 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        value={formData?.status}
                        onChange={e => handleChange('status', e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="stable">Stable</option>
                        <option value="critical">Critical</option>
                        <option value="recovered">Recovered</option>
                        <option value="discharged">Discharged</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-surface-700">Gender</label>
                      <select 
                        className="w-full h-10 bg-white border border-surface-200 rounded-lg text-sm px-3.5 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        value={formData?.gender}
                        onChange={e => handleChange('gender', e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-surface-700">Blood Group</label>
                      <select 
                        className="w-full h-10 bg-white border border-surface-200 rounded-lg text-sm px-3.5 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        value={formData?.bloodGroup}
                        onChange={e => handleChange('bloodGroup', e.target.value)}
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Clinical Details">
                <div className="space-y-3">
                  <Input 
                    label="Primary Condition" 
                    value={formData?.condition} 
                    onChange={e => handleChange('condition', e.target.value)}
                    error={errors.condition}
                    fullWidth
                  />
                  <Input 
                    label="Attending Doctor" 
                    value={formData?.doctor} 
                    onChange={e => handleChange('doctor', e.target.value)}
                    error={errors.doctor}
                    fullWidth
                  />
                  <Input 
                    label="Ward / Unit" 
                    value={formData?.ward} 
                    onChange={e => handleChange('ward', e.target.value)}
                    fullWidth
                  />
                </div>
              </Section>

              <Section title="Vitals (Current)">
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    label="Heart Rate" 
                    type="number"
                    value={formData?.vitals.heartRate} 
                    onChange={e => handleChange('vitals.heartRate', parseInt(e.target.value))}
                    fullWidth
                  />
                  <Input 
                    label="Blood Pressure" 
                    value={formData?.vitals.bloodPressure} 
                    onChange={e => handleChange('vitals.bloodPressure', e.target.value)}
                    fullWidth
                  />
                </div>
              </Section>

              <Section title="Contact Information">
                <div className="space-y-3">
                  <Input 
                    label="Phone Number" 
                    value={formData?.phone} 
                    onChange={e => handleChange('phone', e.target.value)}
                    error={errors.phone}
                    fullWidth
                  />
                  <Input 
                    label="Email Address" 
                    type="email"
                    value={formData?.email} 
                    onChange={e => handleChange('email', e.target.value)}
                    fullWidth
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-surface-700">Address</label>
                    <textarea 
                      className="w-full bg-white border border-surface-200 rounded-lg text-sm p-3.5 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[80px]"
                      value={formData?.address}
                      onChange={e => handleChange('address', e.target.value)}
                    />
                  </div>
                </div>
              </Section>
            </form>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-surface-100 p-4 flex gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth 
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                fullWidth 
                type="submit"
                form="edit-patient-form"
                loading={isSubmitting}
                icon={<Save size={14} />}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" size="sm" fullWidth>Schedule Appointment</Button>
              <Button variant="outline" size="sm">Print Record</Button>
            </>
          )}
        </div>
      </div>
      <ConfirmDialog 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Patient Record"
        description={`Are you sure you want to delete ${patient.name}? This action cannot be undone and all clinical data for this patient will be permanently removed.`}
        confirmLabel="Delete Record"
      />
    </>
  );
};


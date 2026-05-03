import { useState, useCallback } from 'react';
import { Patient } from '../../../types';
import { usePatientStore } from '../../../stores/patientStore';
import { useNotificationStore } from '../../../stores/notificationStore';
import { useToast } from '../../../components/ui/Toast';

export const usePatientForm = (initialPatient: Patient | null, onComplete: () => void) => {
  const [formData, setFormData] = useState<Patient | null>(initialPatient);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updatePatient } = usePatientStore();
  const { addNotification } = useNotificationStore();
  const { toast } = useToast();

  const handleChange = useCallback((field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return null;
      
      // Handle nested vitals
      if (field.startsWith('vitals.')) {
        const vitalField = field.split('.')[1];
        return {
          ...prev,
          vitals: {
            ...prev.vitals,
            [vitalField]: value,
          },
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });

    // Clear error when field changes
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData?.name.trim()) newErrors.name = 'Name is required';
    if (!formData?.condition.trim()) newErrors.condition = 'Condition is required';
    if (!formData?.doctor.trim()) newErrors.doctor = 'Doctor is required';
    if (!formData?.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !validate()) return;

    setIsSubmitting(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      updatePatient(formData.id, formData);
      addNotification({
        title: 'Patient Updated',
        message: `${formData.name}'s records have been updated successfully.`,
        type: 'success',
      });
      toast(`${formData.name}'s records updated`, 'success');
      onComplete();
    } catch (error) {
      addNotification({
        title: 'Update Failed',
        message: 'Something went wrong while updating patient records.',
        type: 'error',
      });
      toast('Failed to update records', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData
  };
};

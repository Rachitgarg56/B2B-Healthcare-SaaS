import { useMemo } from 'react';
import { usePatientStore } from '../../../stores/patientStore';
import { analyticsData } from '../../../lib/mockData';

export const useAnalyticsData = () => {
  const { patients } = usePatientStore();

  const kpis = useMemo(() => {
    const totalPatients = patients.length;
    const avgAge = totalPatients > 0 
      ? Math.round(patients.reduce((s, p) => s + p.age, 0) / totalPatients)
      : 0;
    const criticalPct = totalPatients > 0
      ? Math.round((patients.filter(p => p.status === 'critical').length / totalPatients) * 100)
      : 0;

    return {
      totalPatients,
      avgAge,
      criticalPct
    };
  }, [patients]);

  const conditionDistribution = useMemo(() => {
    const total = analyticsData.conditionDistribution.reduce((s, x) => s + x.count, 0);
    return analyticsData.conditionDistribution.map(c => ({
      ...c,
      percentage: total > 0 ? Math.round((c.count / total) * 100) : 0
    }));
  }, []);

  return {
    kpis,
    monthlyPatients: analyticsData.monthlyPatients,
    weeklyAdmissions: analyticsData.weeklyAdmissions,
    statusDistribution: analyticsData.statusDistribution,
    conditionDistribution
  };
};

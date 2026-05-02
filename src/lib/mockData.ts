import { Patient, AnalyticsData } from '../types';

const conditions = ['Hypertension', 'Diabetes Type 2', 'Cardiac Arrhythmia', 'Asthma', 'Pneumonia', 'Fracture', 'Appendicitis', 'Migraine', 'Kidney Disease', 'Arthritis'];
const doctors = ['Dr. Priya Sharma', 'Dr. Arjun Mehta', 'Dr. Kavitha Nair', 'Dr. Rohit Verma', 'Dr. Ananya Singh'];
const wards = ['Cardiology', 'General', 'ICU', 'Orthopedic', 'Neurology', 'Pulmonology'];
const statuses: Patient['status'][] = ['active', 'stable', 'critical', 'recovered', 'discharged'];
const bloodGroups: Patient['bloodGroup'][] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const firstNames = ['Aditya', 'Priya', 'Rohit', 'Sunita', 'Vikram', 'Meena', 'Arjun', 'Kavitha', 'Rahul', 'Deepa', 'Sanjay', 'Anjali', 'Mohan', 'Rekha', 'Suresh', 'Lalitha', 'Ravi', 'Uma', 'Kiran', 'Pooja'];
const lastNames = ['Sharma', 'Verma', 'Nair', 'Patel', 'Singh', 'Gupta', 'Mehta', 'Joshi', 'Rao', 'Kumar', 'Iyer', 'Reddy', 'Pillai', 'Menon', 'Das'];
const medications = ['Metformin', 'Lisinopril', 'Atorvastatin', 'Amlodipine', 'Omeprazole', 'Aspirin', 'Metoprolol', 'Losartan', 'Salbutamol', 'Prednisone'];

function randomItem<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const mockPatients: Patient[] = Array.from({ length: 48 }, (_, i) => {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const gender: Patient['gender'] = Math.random() > 0.45 ? 'Male' : 'Female';
  const age = randomInt(18, 85);
  const admDate = new Date(2024, randomInt(0, 11), randomInt(1, 28));
  const lastVisitDate = new Date(admDate.getTime() + randomInt(1, 90) * 86400000);
  const meds = Array.from(new Set([randomItem(medications), randomItem(medications), randomItem(medications)])).slice(0, randomInt(1, 3));

  return {
    id: `PAT-${String(i + 1001).padStart(4, '0')}`,
    name: `${firstName} ${lastName}`,
    age,
    gender,
    bloodGroup: randomItem(bloodGroups),
    condition: randomItem(conditions),
    status: randomItem(statuses),
    doctor: randomItem(doctors),
    ward: randomItem(wards),
    admissionDate: admDate.toISOString().split('T')[0],
    phone: `+91 ${randomInt(70, 99)}${randomInt(10000000, 99999999)}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    address: `${randomInt(1, 99)}, MG Road, ${randomItem(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'])}`,
    lastVisit: lastVisitDate.toISOString().split('T')[0],
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}${lastName}&backgroundColor=0c7fe4,22c55e,f59e0b,8b5cf6,f43f5e&fontFamily=Helvetica`,
    vitals: {
      heartRate: randomInt(60, 110),
      bloodPressure: `${randomInt(110, 160)}/${randomInt(70, 100)}`,
      temperature: parseFloat((36 + Math.random() * 2.5).toFixed(1)),
      oxygenLevel: randomInt(93, 100),
    },
    medications: meds,
  };
});

export const analyticsData: AnalyticsData = {
  monthlyPatients: [
    { month: 'Jan', patients: 145, discharged: 128 },
    { month: 'Feb', patients: 162, discharged: 149 },
    { month: 'Mar', patients: 178, discharged: 164 },
    { month: 'Apr', patients: 191, discharged: 175 },
    { month: 'May', patients: 209, discharged: 188 },
    { month: 'Jun', patients: 224, discharged: 203 },
    { month: 'Jul', patients: 242, discharged: 218 },
    { month: 'Aug', patients: 258, discharged: 235 },
    { month: 'Sep', patients: 271, discharged: 249 },
    { month: 'Oct', patients: 289, discharged: 262 },
    { month: 'Nov', patients: 301, discharged: 278 },
    { month: 'Dec', patients: 318, discharged: 294 },
  ],
  conditionDistribution: [
    { condition: 'Hypertension', count: 87, color: '#0c7fe4' },
    { condition: 'Diabetes', count: 64, color: '#8b5cf6' },
    { condition: 'Cardiac', count: 52, color: '#f43f5e' },
    { condition: 'Asthma', count: 41, color: '#14b8a6' },
    { condition: 'Fracture', count: 38, color: '#f59e0b' },
    { condition: 'Other', count: 56, color: '#94a3b8' },
  ],
  weeklyAdmissions: [
    { day: 'Mon', admissions: 24, discharges: 20 },
    { day: 'Tue', admissions: 31, discharges: 28 },
    { day: 'Wed', admissions: 28, discharges: 25 },
    { day: 'Thu', admissions: 35, discharges: 30 },
    { day: 'Fri', admissions: 42, discharges: 38 },
    { day: 'Sat', admissions: 18, discharges: 15 },
    { day: 'Sun', admissions: 14, discharges: 12 },
  ],
  statusDistribution: [
    { name: 'Active', value: 142, color: '#0c7fe4' },
    { name: 'Stable', value: 98, color: '#22c55e' },
    { name: 'Critical', value: 23, color: '#f43f5e' },
    { name: 'Recovered', value: 67, color: '#14b8a6' },
    { name: 'Discharged', value: 189, color: '#94a3b8' },
  ],
};

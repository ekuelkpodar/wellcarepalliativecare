import {
  CareEpisode,
  CareTeamMember,
  Encounter,
  FunctionalStatus,
  IntakeReferral,
  InterdisciplinaryTeam,
  Medication,
  Patient,
  SymptomLog,
  Task,
  TransportationEvent,
  User,
  Utilization,
  Vital,
  EquipmentOrder,
  Communication,
  Document
} from '../types';

export const organizations = [
  { id: 'org1', name: 'WellCare Palliative Program', type: 'home-based', region: 'Bay Area', contact: '555-111-2222' },
  { id: 'org2', name: 'Hope Hospice Collaborative', type: 'hospice', region: 'North Bay', contact: '555-333-4444' }
];

export const teams: InterdisciplinaryTeam[] = [
  { id: 'team1', name: 'South Bay IDT', region: 'San Jose', serviceLines: 'home, telehealth', organizationId: 'org1', members: [] },
  { id: 'team2', name: 'North Bay IDT', region: 'Marin', serviceLines: 'home, hospice, clinic', organizationId: 'org2', members: [] }
];

export const careTeamMembers: CareTeamMember[] = [
  { id: 'ctm1', name: 'Rita Alvarez, RN', role: 'NURSE', disciplines: ['RN'], contact: 'rita@wellcare.com', teamId: 'team1' },
  { id: 'ctm2', name: 'Dr. Amir Khan', role: 'PHYSICIAN', disciplines: ['MD'], contact: 'amir@wellcare.com', teamId: 'team1' },
  { id: 'ctm3', name: 'Sam Lee, LCSW', role: 'SOCIAL_WORKER', disciplines: ['SW'], contact: 'sam@wellcare.com', teamId: 'team1' },
  { id: 'ctm4', name: 'Chloe Briggs, Chaplain', role: 'CHAPLAIN', disciplines: ['CH'], contact: 'chloe@hope.org', teamId: 'team2' },
  { id: 'ctm5', name: 'Jamie Taylor, RN', role: 'NURSE', disciplines: ['RN'], contact: 'jamie@hope.org', teamId: 'team2' },
  { id: 'ctm6', name: 'Dr. Priya Desai', role: 'PHYSICIAN', disciplines: ['MD'], contact: 'priya@hope.org', teamId: 'team2' }
];

export const users: User[] = [
  { id: 'u1', name: 'Coordinator Kay', email: 'kay@wellcare.com', role: 'COORDINATOR' },
  { id: 'u2', name: 'Nurse Riley', email: 'riley@wellcare.com', role: 'NURSE' },
  { id: 'u3', name: 'Dr. Stone', email: 'stone@wellcare.com', role: 'PHYSICIAN' },
  { id: 'u4', name: 'Social Worker Sam', email: 'sam@wellcare.com', role: 'SOCIAL_WORKER' },
  { id: 'u5', name: 'Chaplain Kai', email: 'kai@hope.org', role: 'CHAPLAIN' },
  { id: 'u6', name: 'Scheduler Mia', email: 'mia@wellcare.com', role: 'COORDINATOR' },
  { id: 'u7', name: 'Patient Demo', email: 'patient@demo.com', role: 'PATIENT', patientId: 'p1' }
];

export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Eleanor Brooks',
    dob: '1950-02-12',
    gender: 'Female',
    primaryLanguage: 'English',
    address: '123 Blossom Ln, San Jose',
    contactInfo: '555-000-1111',
    emergencyContacts: 'Daughter: Mia Brooks 555-222-1111',
    primaryDiagnosis: 'CHF',
    secondaryDiagnoses: 'CKD stage 3',
    palliativeEligibility: 'NYHA III, multiple ED visits',
    codeStatus: 'DNR/DNI',
    carePreferences: 'Prefers home, avoid hospitalization',
    livingSituation: 'With daughter',
    primaryCaregiver: 'Mia Brooks',
    goalsOfCare: 'Stay home, manage breathlessness',
    spiritualPreferences: 'Christian, prefers hymns',
    riskOfED: 7,
    riskOfHospitalization: 6
  },
  {
    id: 'p2',
    name: 'Robert Chen',
    dob: '1946-09-01',
    gender: 'Male',
    primaryLanguage: 'Mandarin',
    address: '45 Creek Rd, Sunnyvale',
    contactInfo: '555-111-3333',
    emergencyContacts: 'Wife: Lian Chen',
    primaryDiagnosis: 'COPD',
    secondaryDiagnoses: 'HTN',
    palliativeEligibility: 'Frequent exacerbations',
    codeStatus: 'Full',
    carePreferences: 'Home with oxygen, avoid ICU',
    livingSituation: 'With spouse',
    primaryCaregiver: 'Lian Chen',
    goalsOfCare: 'Reduce ER use, improve sleep',
    spiritualPreferences: 'Buddhist practices',
    riskOfED: 6,
    riskOfHospitalization: 7
  },
  {
    id: 'p3',
    name: 'Linda Garcia',
    dob: '1970-11-20',
    gender: 'Female',
    primaryLanguage: 'English',
    address: '77 Ocean Ave, Santa Cruz',
    contactInfo: '555-888-1212',
    emergencyContacts: 'Partner: Carla Ruiz',
    primaryDiagnosis: 'Metastatic breast cancer',
    secondaryDiagnoses: 'Anxiety',
    palliativeEligibility: 'Metastatic disease with symptoms',
    codeStatus: 'DNR',
    carePreferences: 'Home hospice transition soon',
    livingSituation: 'With partner',
    primaryCaregiver: 'Carla Ruiz',
    goalsOfCare: 'Comfort, prepare family',
    spiritualPreferences: 'Meditation',
    riskOfED: 8,
    riskOfHospitalization: 9
  },
  {
    id: 'p4',
    name: 'Marcus Reed',
    dob: '1958-05-10',
    gender: 'Male',
    primaryLanguage: 'English',
    address: '220 Pine St, Oakland',
    contactInfo: '555-234-5678',
    emergencyContacts: 'Sister: Angela Reed',
    primaryDiagnosis: 'ALS',
    secondaryDiagnoses: 'Dysphagia',
    palliativeEligibility: 'Progressive neuro disease',
    codeStatus: 'Full',
    carePreferences: 'Home with vent support',
    livingSituation: 'With sister',
    primaryCaregiver: 'Angela Reed',
    goalsOfCare: 'Maintain independence, clear communication',
    spiritualPreferences: 'Non-denominational',
    riskOfED: 7,
    riskOfHospitalization: 8
  },
  {
    id: 'p5',
    name: 'Olivia Martinez',
    dob: '1938-12-30',
    gender: 'Female',
    primaryLanguage: 'Spanish',
    address: '88 Vineyard Dr, Gilroy',
    contactInfo: '555-321-5555',
    emergencyContacts: 'Son: Javier',
    primaryDiagnosis: 'Dementia',
    secondaryDiagnoses: 'HTN',
    palliativeEligibility: 'Advanced dementia with weight loss',
    codeStatus: 'DNR',
    carePreferences: 'Avoid hospital, comfort focused',
    livingSituation: 'Assisted living',
    primaryCaregiver: 'Facility staff + son',
    goalsOfCare: 'Comfort, prevent pressure injuries',
    spiritualPreferences: 'Catholic',
    riskOfED: 5,
    riskOfHospitalization: 5
  },
  {
    id: 'p6',
    name: 'Noah Patel',
    dob: '1965-07-18',
    gender: 'Male',
    primaryLanguage: 'English',
    address: '5 Green Meadow, Fremont',
    contactInfo: '555-333-9999',
    emergencyContacts: 'Spouse: Asha Patel',
    primaryDiagnosis: 'ESRD on dialysis',
    secondaryDiagnoses: 'Diabetes',
    palliativeEligibility: 'High symptom burden, multiple admissions',
    codeStatus: 'Full',
    carePreferences: 'Comfort while continuing dialysis',
    livingSituation: 'With spouse',
    primaryCaregiver: 'Asha Patel',
    goalsOfCare: 'Balance comfort and dialysis',
    spiritualPreferences: 'Hindu',
    riskOfED: 6,
    riskOfHospitalization: 7
  },
  {
    id: 'p7',
    name: 'Grace Thompson',
    dob: '1990-04-01',
    gender: 'Female',
    primaryLanguage: 'English',
    address: '12 River Bend, San Mateo',
    contactInfo: '555-101-2020',
    emergencyContacts: 'Mother: Tessa Thompson',
    primaryDiagnosis: 'Pulmonary fibrosis',
    secondaryDiagnoses: 'Depression',
    palliativeEligibility: 'Advanced lung disease',
    codeStatus: 'Full',
    carePreferences: 'Wants to stay active with portable O2',
    livingSituation: 'With roommate',
    primaryCaregiver: 'Mother visits weekly',
    goalsOfCare: 'Maintain mobility, manage anxiety',
    spiritualPreferences: 'Spiritual but not religious',
    riskOfED: 4,
    riskOfHospitalization: 5
  },
  {
    id: 'p8',
    name: 'Henry Wallace',
    dob: '1942-03-03',
    gender: 'Male',
    primaryLanguage: 'English',
    address: '99 Maple Grove, San Jose',
    contactInfo: '555-676-4545',
    emergencyContacts: 'Daughter: Kelly',
    primaryDiagnosis: 'Parkinson’s disease',
    secondaryDiagnoses: 'Orthostatic hypotension',
    palliativeEligibility: 'Frequent falls, functional decline',
    codeStatus: 'DNR/DNI',
    carePreferences: 'Home with safety equipment',
    livingSituation: 'With daughter',
    primaryCaregiver: 'Kelly Wallace',
    goalsOfCare: 'Prevent falls, stay at home',
    spiritualPreferences: 'Methodist',
    riskOfED: 5,
    riskOfHospitalization: 6
  },
  {
    id: 'p9',
    name: 'Amina Yusuf',
    dob: '1975-06-14',
    gender: 'Female',
    primaryLanguage: 'Somali',
    address: '14 Horizon Ct, Hayward',
    contactInfo: '555-009-7788',
    emergencyContacts: 'Brother: Omar Yusuf',
    primaryDiagnosis: 'Sickle cell disease',
    secondaryDiagnoses: 'Chronic pain',
    palliativeEligibility: 'Recurrent crises',
    codeStatus: 'Full',
    carePreferences: 'Home with rapid rescue plan',
    livingSituation: 'With brother',
    primaryCaregiver: 'Omar Yusuf',
    goalsOfCare: 'Avoid ED, home pain protocol',
    spiritualPreferences: 'Muslim',
    riskOfED: 9,
    riskOfHospitalization: 8
  },
  {
    id: 'p10',
    name: 'Walter Nguyen',
    dob: '1960-08-22',
    gender: 'Male',
    primaryLanguage: 'English',
    address: '3 Sunrise Way, Palo Alto',
    contactInfo: '555-220-1100',
    emergencyContacts: 'Partner: Alex Tran',
    primaryDiagnosis: 'Glioblastoma',
    secondaryDiagnoses: 'Seizure disorder',
    palliativeEligibility: 'Advanced cancer',
    codeStatus: 'DNR',
    carePreferences: 'Home hospice when ready',
    livingSituation: 'With partner',
    primaryCaregiver: 'Alex Tran',
    goalsOfCare: 'Comfort, memory making',
    spiritualPreferences: 'Buddhist',
    riskOfED: 7,
    riskOfHospitalization: 9
  }
];

export const episodes: CareEpisode[] = patients.map((p, idx) => ({
  id: `ep${idx + 1}`,
  patientId: p.id,
  startDate: '2024-01-05',
  referralSource: idx % 2 === 0 ? 'Hospital' : 'PCP',
  careSetting: idx % 3 === 0 ? 'home-based' : 'clinic',
  attendingProviderId: idx % 2 === 0 ? 'ctm2' : 'ctm6',
  teamId: idx % 2 === 0 ? 'team1' : 'team2',
  status: idx === 2 ? 'hospice_transition' : 'active'
}));

export const encounters: Encounter[] = [
  {
    id: 'enc1',
    patientId: 'p1',
    episodeId: 'ep1',
    type: 'HOME_VISIT',
    discipline: 'NURSE',
    startTime: '2024-06-01T10:00:00Z',
    endTime: '2024-06-01T10:45:00Z',
    location: 'Home',
    notes: 'Reviewed meds, adjusted diuretics',
    problems: 'Dyspnea, edema',
    followUpPlan: 'RN revisit 1 week',
    nextVisitRecommended: '2024-06-08T10:00:00Z'
  },
  {
    id: 'enc2',
    patientId: 'p2',
    episodeId: 'ep2',
    type: 'TELEHEALTH',
    discipline: 'PHYSICIAN',
    startTime: '2024-06-02T09:00:00Z',
    endTime: '2024-06-02T09:30:00Z',
    location: 'Telehealth',
    notes: 'COPD exacerbation education',
    problems: 'Cough, sputum',
    interventions: 'Steroid taper, inhaler refills',
    followUpPlan: 'RN call in 2 days'
  },
  {
    id: 'enc3',
    patientId: 'p3',
    episodeId: 'ep3',
    type: 'HOME_VISIT',
    discipline: 'SOCIAL_WORKER',
    startTime: '2024-06-03T13:00:00Z',
    endTime: '2024-06-03T14:00:00Z',
    location: 'Home',
    notes: 'Family meeting for hospice planning',
    problems: 'Caregiver strain',
    followUpPlan: 'Chaplain visit'
  }
];

export const symptomLogs: SymptomLog[] = [
  { id: 's1', patientId: 'p1', timestamp: '2024-06-04T08:00:00Z', reportedBy: 'patient', pain: 4, dyspnea: 6, fatigue: 5, notes: 'Slept poorly' },
  { id: 's2', patientId: 'p1', timestamp: '2024-06-05T08:00:00Z', reportedBy: 'patient', pain: 3, dyspnea: 5, fatigue: 4, notes: 'Better after med change' },
  { id: 's3', patientId: 'p3', timestamp: '2024-06-05T12:00:00Z', reportedBy: 'caregiver', pain: 7, dyspnea: 2, fatigue: 8, notes: 'Pain worse at night' },
  { id: 's4', patientId: 'p9', timestamp: '2024-06-05T09:00:00Z', reportedBy: 'patient', pain: 8, dyspnea: 3, fatigue: 6, notes: 'Crisis warning' }
];

export const functionalStatuses: FunctionalStatus[] = [
  { id: 'fs1', patientId: 'p1', timestamp: '2024-06-01T12:00:00Z', adlStatus: 'Needs assist bathing, dressing', mobility: 'Walks indoors with walker', performance: 'PPS 60' },
  { id: 'fs2', patientId: 'p3', timestamp: '2024-06-02T12:00:00Z', adlStatus: 'Needs assist most ADLs', mobility: 'Mostly bed to chair', performance: 'PPS 50' },
  { id: 'fs3', patientId: 'p9', timestamp: '2024-06-03T12:00:00Z', adlStatus: 'Independent between crises', mobility: 'Walks outdoors', performance: 'PPS 80' }
];

export const medications: Medication[] = [
  { id: 'm1', patientId: 'p1', name: 'Furosemide', strength: '40mg', route: 'PO', schedule: 'BID', indication: 'Fluid overload', startDate: '2024-05-01', active: true, notes: 'Monitor electrolytes' },
  { id: 'm2', patientId: 'p1', name: 'Morphine', strength: '5mg', route: 'SL', schedule: 'q4h PRN', indication: 'Dyspnea', startDate: '2024-05-15', active: true, notes: 'Educated family on dosing' },
  { id: 'm3', patientId: 'p3', name: 'Hydromorphone', strength: '2mg', route: 'PO', schedule: 'q4h PRN', indication: 'Pain', startDate: '2024-05-10', active: true },
  { id: 'm4', patientId: 'p9', name: 'Hydroxyurea', strength: '500mg', route: 'PO', schedule: 'Daily', indication: 'Sickle cell', startDate: '2024-01-01', active: true }
];

export const vitals: Vital[] = [
  { id: 'v1', patientId: 'p1', timestamp: '2024-06-01T10:10:00Z', heartRate: 88, systolic: 118, diastolic: 70, oxygenSaturation: 93, weight: 68.5 },
  { id: 'v2', patientId: 'p2', timestamp: '2024-06-02T09:05:00Z', heartRate: 92, systolic: 130, diastolic: 80, oxygenSaturation: 90, weight: 70 },
  { id: 'v3', patientId: 'p3', timestamp: '2024-06-03T13:10:00Z', heartRate: 96, systolic: 110, diastolic: 68, oxygenSaturation: 94, weight: 60 }
];

export const tasks: Task[] = [
  {
    id: 't1',
    patientId: 'p1',
    episodeId: 'ep1',
    assignedTo: 'ctm1',
    createdBy: 'u2',
    createdAt: '2024-06-01T10:45:00Z',
    dueAt: '2024-06-08T10:00:00Z',
    category: 'clinical',
    title: 'Reassess fluid status',
    description: 'Weight, edema check',
    status: 'open',
    priority: 'high'
  },
  {
    id: 't2',
    patientId: 'p3',
    episodeId: 'ep3',
    assignedTo: 'ctm4',
    createdBy: 'u4',
    createdAt: '2024-06-03T14:00:00Z',
    category: 'spiritual',
    title: 'Chaplain visit',
    description: 'Provide spiritual support',
    status: 'in_progress',
    priority: 'normal'
  },
  {
    id: 't3',
    patientId: 'p9',
    episodeId: 'ep9',
    assignedTo: 'ctm1',
    createdBy: 'u2',
    createdAt: '2024-06-05T09:15:00Z',
    dueAt: '2024-06-05T15:00:00Z',
    category: 'clinical',
    title: 'Pain crisis triage',
    description: 'Call patient, adjust meds',
    status: 'open',
    priority: 'urgent'
  },
  {
    id: 't4',
    patientId: 'p5',
    episodeId: 'ep5',
    assignedTo: 'ctm3',
    createdBy: 'u1',
    createdAt: '2024-06-02T08:00:00Z',
    category: 'social',
    title: 'Coordinate benefits',
    description: 'Medi-Cal renewal',
    status: 'open',
    priority: 'normal'
  }
];

export const communications: Communication[] = [
  { id: 'c1', patientId: 'p1', direction: 'inbound', channel: 'portal', contentSummary: 'Shortness of breath overnight', timestamp: '2024-06-04T07:30:00Z', taggedAs: 'symptom' },
  { id: 'c2', patientId: 'p3', direction: 'outbound', channel: 'phone', contentSummary: 'Update on hospice transition', timestamp: '2024-06-03T15:00:00Z', taggedAs: 'care_plan' },
  { id: 'c3', patientId: 'p9', direction: 'inbound', channel: 'portal', contentSummary: 'Pain crisis warning', timestamp: '2024-06-05T09:00:00Z', taggedAs: 'urgent' }
];

export const documents: Document[] = [
  { id: 'd1', patientId: 'p1', documentType: 'advance_directive', uploadedBy: 'u2', uploadedAt: '2024-05-20', storageUrl: '/docs/p1-advance.pdf', status: 'active' },
  { id: 'd2', patientId: 'p3', documentType: 'POLST', uploadedBy: 'u3', uploadedAt: '2024-05-15', storageUrl: '/docs/p3-polst.pdf', status: 'active' }
];

export const equipmentOrders: EquipmentOrder[] = [
  { id: 'e1', patientId: 'p1', type: 'Hospital bed', status: 'delivered', vendor: 'DME Co', orderDate: '2024-05-10', deliveryDate: '2024-05-12' },
  { id: 'e2', patientId: 'p8', type: 'Walker', status: 'ordered', vendor: 'Mobility Plus', orderDate: '2024-06-01' }
];

export const transportationEvents: TransportationEvent[] = [
  { id: 'tr1', patientId: 'p6', type: 'Dialysis ride', origin: 'Home', destination: 'Dialysis center', dateTime: '2024-06-04T07:00:00Z', reason: 'Dialysis', arrangedBy: 'u6', vendor: 'NEMT Co', outcome: 'completed' },
  { id: 'tr2', patientId: 'p9', type: 'Ambulance', origin: 'Home', destination: 'ED', dateTime: '2024-05-28T18:00:00Z', reason: 'Pain crisis', arrangedBy: 'self', outcome: 'completed' }
];

export const utilizations: Utilization[] = [
  { id: 'uutil1', patientId: 'p1', facility: 'SJ General', startTime: '2024-04-15', endTime: '2024-04-18', reason: 'CHF exacerbation', outcome: 'discharged_home', avoidable: true },
  { id: 'uutil2', patientId: 'p9', facility: 'Hayward Med', startTime: '2024-05-28', reason: 'Pain crisis', outcome: 'admitted', avoidable: false }
];

export const intakeReferrals: IntakeReferral[] = [
  {
    id: 'r1',
    patientName: 'Julia Perez',
    dob: '1955-05-11',
    primaryDiagnosis: 'CHF',
    referringProvider: 'Hospitalist',
    reason: 'Multiple ED visits, dyspnea',
    urgency: '24-48 hours',
    symptomBurden: 'Dyspnea 7/10',
    functionalStatus: 'Needs assist ADLs',
    codeStatus: 'Full',
    createdAt: '2024-06-05',
    assignedTeam: 'team1',
    status: 'in_review'
  },
  {
    id: 'r2',
    patientName: 'Sean Murphy',
    dob: '1940-01-22',
    primaryDiagnosis: 'Dementia',
    referringProvider: 'PCP',
    reason: 'Worsening function, caregiver stress',
    urgency: 'Routine',
    symptomBurden: 'Behavior changes',
    functionalStatus: 'Needs assist all ADLs',
    codeStatus: 'DNR',
    createdAt: '2024-06-03',
    status: 'new'
  },
  {
    id: 'r3',
    patientName: 'Lena Ortiz',
    primaryDiagnosis: 'Metastatic ovarian cancer',
    referringProvider: 'Oncologist',
    reason: 'Pain management, goals of care',
    urgency: 'Same day',
    symptomBurden: 'Pain 8/10',
    functionalStatus: 'Limited mobility',
    codeStatus: 'Full',
    createdAt: '2024-06-05',
    status: 'urgent'
  }
];

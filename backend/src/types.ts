export type Role =
  | 'PATIENT'
  | 'CAREGIVER'
  | 'NURSE'
  | 'PHYSICIAN'
  | 'SOCIAL_WORKER'
  | 'CHAPLAIN'
  | 'COORDINATOR'
  | 'ADMIN'
  | 'CARE_PROVIDER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  patientId?: string;
}

export interface CareTeamMember {
  id: string;
  name: string;
  role: Role;
  disciplines: string[];
  contact?: string;
  teamId?: string;
}

export interface InterdisciplinaryTeam {
  id: string;
  name: string;
  region: string;
  serviceLines: string;
  organizationId?: string;
  members: CareTeamMember[];
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender?: string;
  primaryLanguage?: string;
  address?: string;
  contactInfo?: string;
  emergencyContacts?: string;
  primaryDiagnosis: string;
  secondaryDiagnoses?: string;
  palliativeEligibility?: string;
  codeStatus: string;
  carePreferences?: string;
  livingSituation?: string;
  primaryCaregiver?: string;
  goalsOfCare?: string;
  spiritualPreferences?: string;
  riskOfED: number;
  riskOfHospitalization: number;
}

export interface CareEpisode {
  id: string;
  patientId: string;
  startDate: string;
  endDate?: string;
  referralSource: string;
  careSetting: string;
  attendingProviderId?: string;
  teamId?: string;
  status: string;
}

export interface Encounter {
  id: string;
  patientId: string;
  episodeId: string;
  type: string;
  discipline: Role | string;
  startTime: string;
  endTime: string;
  location: string;
  notes: string;
  problems?: string;
  interventions?: string;
  followUpPlan?: string;
  nextVisitRecommended?: string;
}

export interface SymptomLog {
  id: string;
  patientId: string;
  timestamp: string;
  reportedBy: string;
  pain?: number;
  dyspnea?: number;
  nausea?: number;
  anxiety?: number;
  fatigue?: number;
  appetite?: number;
  sleepQuality?: number;
  notes?: string;
}

export interface FunctionalStatus {
  id: string;
  patientId: string;
  timestamp: string;
  adlStatus: string;
  mobility: string;
  performance?: string;
  cognitive?: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  strength: string;
  route: string;
  schedule: string;
  indication: string;
  prescribingProviderId?: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  notes?: string;
}

export interface Vital {
  id: string;
  patientId: string;
  timestamp: string;
  heartRate?: number;
  systolic?: number;
  diastolic?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  temperature?: number;
  weight?: number;
  notes?: string;
}

export interface Task {
  id: string;
  patientId?: string;
  episodeId?: string;
  assignedTo?: string;
  createdBy?: string;
  createdAt: string;
  dueAt?: string;
  completedAt?: string;
  category: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
}

export interface Communication {
  id: string;
  patientId: string;
  direction: string;
  channel: string;
  contentSummary: string;
  fullContent?: string;
  timestamp: string;
  taggedAs?: string;
}

export interface Document {
  id: string;
  patientId: string;
  documentType: string;
  uploadedBy: string;
  uploadedAt: string;
  storageUrl: string;
  status: string;
}

export interface EquipmentOrder {
  id: string;
  patientId: string;
  type: string;
  status: string;
  vendor?: string;
  orderDate: string;
  deliveryDate?: string;
  pickupDate?: string;
  notes?: string;
}

export interface TransportationEvent {
  id: string;
  patientId: string;
  type: string;
  origin: string;
  destination: string;
  dateTime: string;
  reason: string;
  arrangedBy?: string;
  vendor?: string;
  outcome?: string;
}

export interface Utilization {
  id: string;
  patientId: string;
  facility: string;
  startTime: string;
  endTime?: string;
  reason: string;
  outcome?: string;
  avoidable: boolean;
}

export interface IntakeReferral {
  id: string;
  patientName: string;
  dob?: string;
  primaryDiagnosis: string;
  referringProvider?: string;
  reason: string;
  urgency: string;
  symptomBurden?: string;
  functionalStatus?: string;
  codeStatus?: string;
  createdAt: string;
  assignedTeam?: string;
  status: string;
}

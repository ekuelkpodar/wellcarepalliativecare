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
import {
  careTeamMembers,
  encounters,
  episodes,
  equipmentOrders,
  functionalStatuses,
  intakeReferrals,
  medications,
  organizations,
  patients,
  symptomLogs,
  tasks,
  teams,
  transportationEvents,
  users,
  utilizations,
  vitals,
  communications,
  documents
} from './seedData';

export interface DataStore {
  patients: Patient[];
  episodes: CareEpisode[];
  encounters: Encounter[];
  symptomLogs: SymptomLog[];
  functionalStatuses: FunctionalStatus[];
  medications: Medication[];
  vitals: Vital[];
  tasks: Task[];
  teams: InterdisciplinaryTeam[];
  careTeamMembers: CareTeamMember[];
  intakeReferrals: IntakeReferral[];
  transportationEvents: TransportationEvent[];
  utilizations: Utilization[];
  users: User[];
  equipmentOrders: EquipmentOrder[];
  communications: Communication[];
  documents: Document[];
  organizations: { id: string; name: string; type: string; region: string; contact?: string }[];
}

export const store: DataStore = {
  patients,
  episodes,
  encounters,
  symptomLogs,
  functionalStatuses,
  medications,
  vitals,
  tasks,
  teams,
  careTeamMembers,
  intakeReferrals,
  transportationEvents,
  utilizations,
  users,
  equipmentOrders,
  communications,
  documents,
  organizations
};

const makeId = () => `id_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`;

export const addSymptomLog = (log: Omit<SymptomLog, 'id' | 'timestamp'> & { timestamp?: string }): SymptomLog => {
  const newLog: SymptomLog = { ...log, id: makeId(), timestamp: log.timestamp ?? new Date().toISOString() };
  store.symptomLogs.push(newLog);
  return newLog;
};

export const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'> & { status?: string }): Task => {
  const newTask: Task = { ...task, id: makeId(), status: task.status ?? 'open', createdAt: new Date().toISOString() };
  store.tasks.push(newTask);
  return newTask;
};

export const updateIntakeReferral = (id: string, data: Partial<IntakeReferral>): IntakeReferral | undefined => {
  const referral = store.intakeReferrals.find((r) => r.id === id);
  if (!referral) return undefined;
  Object.assign(referral, data);
  return referral;
};

export const findPatientBundle = (patientId: string) => {
  const patient = store.patients.find((p) => p.id === patientId);
  if (!patient) return undefined;
  const patientEpisodes = store.episodes.filter((e) => e.patientId === patientId);
  const patientMedications = store.medications.filter((m) => m.patientId === patientId);
  const patientVitals = store.vitals.filter((v) => v.patientId === patientId);
  const patientSymptoms = store.symptomLogs.filter((s) => s.patientId === patientId);
  const patientFunctional = store.functionalStatuses.filter((f) => f.patientId === patientId);
  const patientTasks = store.tasks.filter((t) => t.patientId === patientId);
  const patientEncounters = store.encounters.filter((e) => e.patientId === patientId);
  const patientEquipment = store.equipmentOrders.filter((e) => e.patientId === patientId);
  const patientTransport = store.transportationEvents.filter((t) => t.patientId === patientId);
  const patientUtilization = store.utilizations.filter((u) => u.patientId === patientId);
  const patientCommunications = store.communications.filter((c) => c.patientId === patientId);
  const patientDocuments = store.documents.filter((d) => d.patientId === patientId);

  const teamIds = patientEpisodes.map((ep) => ep.teamId).filter(Boolean) as string[];
  const relatedTeams = store.teams.filter((t) => teamIds.includes(t.id));
  const relatedMembers = store.careTeamMembers.filter((m) => teamIds.includes(m.teamId ?? ''));

  return {
    patient,
    episodes: patientEpisodes,
    medications: patientMedications,
    vitals: patientVitals,
    symptomLogs: patientSymptoms,
    functionalStatuses: patientFunctional,
    tasks: patientTasks,
    encounters: patientEncounters,
    equipment: patientEquipment,
    transportationEvents: patientTransport,
    utilizations: patientUtilization,
    communications: patientCommunications,
    documents: patientDocuments,
    teams: relatedTeams,
    careTeamMembers: relatedMembers
  };
};

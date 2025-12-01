import { Router } from 'express';
import { AuthedRequest, requireRole } from '../middleware/auth';
import { addSymptomLog, findPatientBundle, store } from '../data/store';
import { triageSymptom, computeRiskScore } from '../utils/risk';

const router = Router();

router.get('/', (req: AuthedRequest, res) => {
  const role = req.user?.role;
  const patientId = req.user?.patientId;
  const scopedPatients = role === 'PATIENT' || role === 'CAREGIVER' ? store.patients.filter((p) => p.id === patientId) : store.patients;

  const rows = scopedPatients.map((patient) => {
    const symptoms = store.symptomLogs.filter((s) => s.patientId === patient.id);
    const functional = store.functionalStatuses.filter((f) => f.patientId === patient.id);
    const utilization = store.utilizations.filter((u) => u.patientId === patient.id);
    const risk = computeRiskScore(symptoms, functional, utilization);

    return {
      ...patient,
      riskScore: risk.composite,
      latestSymptom: risk.latestSymptom,
      latestFunction: risk.latestFunction,
      openTasks: store.tasks.filter((t) => t.patientId === patient.id && t.status !== 'completed').length
    };
  });

  res.json(rows);
});

router.get('/:id', (req: AuthedRequest, res) => {
  const bundle = findPatientBundle(req.params.id);
  if (!bundle) return res.status(404).json({ error: 'Patient not found' });

  const risk = computeRiskScore(bundle.symptomLogs, bundle.functionalStatuses, bundle.utilizations);
  res.json({ ...bundle, riskScore: risk.composite });
});

router.post('/:id/symptoms', requireRole(['PATIENT', 'CAREGIVER', 'NURSE', 'PHYSICIAN', 'SOCIAL_WORKER']), (req: AuthedRequest, res) => {
  const { pain, dyspnea, fatigue, notes } = req.body ?? {};
  const patientId = req.params.id;
  if (!store.patients.find((p) => p.id === patientId)) return res.status(404).json({ error: 'Patient not found' });

  const log = addSymptomLog({
    patientId,
    reportedBy: req.user?.name ?? 'unknown',
    pain,
    dyspnea,
    fatigue,
    notes
  });
  const triage = triageSymptom(pain, dyspnea);
  res.status(201).json({ log, triage });
});

export default router;

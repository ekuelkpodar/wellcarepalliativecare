import { Router } from 'express';
import { store } from '../data/store';
import { computeRiskScore } from '../utils/risk';

const router = Router();

router.get('/', (_req, res) => {
  const rows = store.patients.map((p) => {
    const symptoms = store.symptomLogs.filter((s) => s.patientId === p.id);
    const risk = computeRiskScore(
      symptoms,
      store.functionalStatuses.filter((f) => f.patientId === p.id),
      store.utilizations.filter((u) => u.patientId === p.id)
    );
    const painSparkline = symptoms.slice(-5).map((s) => s.pain ?? 0);
    const upcoming = store.encounters.find((e) => e.patientId === p.id);
    return {
      id: p.id,
      name: p.name,
      diagnosis: p.primaryDiagnosis,
      riskScore: risk.composite,
      sparkline: painSparkline,
      nextConversation: upcoming?.followUpPlan ?? 'Review goals of care',
      disposition: p.goalsOfCare ?? 'Continue program'
    };
  });
  res.json(rows);
});

export default router;

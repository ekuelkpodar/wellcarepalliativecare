import { Router } from 'express';
import { store } from '../data/store';
import { computeRiskScore } from '../utils/risk';

const router = Router();

router.get('/', (_req, res) => {
  const census = store.patients.length;
  const byRegion = store.teams.reduce<Record<string, number>>((acc, team) => {
    acc[team.region] = (acc[team.region] ?? 0) + store.episodes.filter((e) => e.teamId === team.id).length;
    return acc;
  }, {});

  const symptomsSevere = store.symptomLogs.filter((s) => (s.pain ?? 0) >= 7 || (s.dyspnea ?? 0) >= 7).length;
  const intakeAging = store.intakeReferrals.filter((r) => r.status === 'new' || r.status === 'in_review').length;

  const riskBuckets = { low: 0, medium: 0, high: 0 };
  store.patients.forEach((p) => {
    const risk = computeRiskScore(
      store.symptomLogs.filter((s) => s.patientId === p.id),
      store.functionalStatuses.filter((f) => f.patientId === p.id),
      store.utilizations.filter((u) => u.patientId === p.id)
    ).composite;
    if (risk >= 8) riskBuckets.high += 1;
    else if (risk >= 5) riskBuckets.medium += 1;
    else riskBuckets.low += 1;
  });

  res.json({
    census,
    byRegion,
    symptomsSevere,
    intakeAging,
    riskBuckets,
    tasksOpen: store.tasks.filter((t) => t.status !== 'completed').length
  });
});

export default router;

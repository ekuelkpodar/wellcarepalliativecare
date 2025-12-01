import { Router } from 'express';
import { findPatientBundle, store } from '../data/store';

const router = Router();

router.get('/:patientId', (req, res) => {
  const bundle = findPatientBundle(req.params.patientId);
  if (!bundle) return res.status(404).json({ error: 'Not found' });
  const nextVisits = store.encounters
    .filter((e) => e.patientId === req.params.patientId)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 3);

  res.json({
    patient: bundle.patient,
    nextVisits,
    carePlan: bundle.patient?.goalsOfCare,
    tasks: bundle.tasks.filter((t) => t.status !== 'completed').slice(0, 5),
    medications: bundle.medications,
    education: [
      'When to call 911 vs call us: severe trouble breathing, chest pain, uncontrolled bleeding',
      'For new or worsening pain, call the team for medication adjustment',
      'Keep medication list updated and within reach'
    ]
  });
});

export default router;

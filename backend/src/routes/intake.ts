import { Router } from 'express';
import { AuthedRequest, requireRole } from '../middleware/auth';
import { store, updateIntakeReferral } from '../data/store';

const router = Router();

router.get('/', requireRole(['COORDINATOR', 'ADMIN', 'NURSE', 'PHYSICIAN']), (_req, res) => {
  const sorted = [...store.intakeReferrals].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json(sorted);
});

router.post('/', requireRole(['COORDINATOR', 'ADMIN']), (req: AuthedRequest, res) => {
  const referral = req.body;
  if (!referral?.patientName || !referral?.primaryDiagnosis) return res.status(400).json({ error: 'patientName and primaryDiagnosis are required' });
  const newReferral = {
    ...referral,
    id: `r${store.intakeReferrals.length + 10}`,
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  store.intakeReferrals.push(newReferral);
  res.status(201).json(newReferral);
});

router.post('/:id/assign', requireRole(['COORDINATOR', 'ADMIN']), (req, res) => {
  const updated = updateIntakeReferral(req.params.id, { assignedTeam: req.body.assignedTeam, status: req.body.status ?? 'in_review' });
  if (!updated) return res.status(404).json({ error: 'Referral not found' });
  res.json(updated);
});

export default router;

import { Router } from 'express';
import { AuthedRequest, requireRole } from '../middleware/auth';
import { addTask, store } from '../data/store';

const router = Router();

router.get('/', (req: AuthedRequest, res) => {
  const { assignedTo, patientId, status } = req.query;
  let result = [...store.tasks];
  if (assignedTo) result = result.filter((t) => t.assignedTo === assignedTo);
  if (patientId) result = result.filter((t) => t.patientId === patientId);
  if (status) result = result.filter((t) => t.status === status);
  res.json(result);
});

router.post('/', requireRole(['NURSE', 'PHYSICIAN', 'SOCIAL_WORKER', 'CHAPLAIN', 'COORDINATOR', 'ADMIN']), (req: AuthedRequest, res) => {
  const { patientId, episodeId, assignedTo, category, title, description, priority, dueAt } = req.body ?? {};
  if (!patientId || !title) return res.status(400).json({ error: 'patientId and title are required' });

  const newTask = addTask({
    patientId,
    episodeId,
    assignedTo,
    category: category ?? 'clinical',
    title,
    description,
    priority: priority ?? 'normal',
    dueAt
  });
  res.status(201).json(newTask);
});

export default router;

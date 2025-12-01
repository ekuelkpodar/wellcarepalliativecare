import { Router } from 'express';
import { store } from '../data/store';

const router = Router();

router.get('/', (_req, res) => {
  const upcoming = store.encounters.map((enc) => {
    const patient = store.patients.find((p) => p.id === enc.patientId);
    const episode = store.episodes.find((e) => e.id === enc.episodeId);
    const team = store.teams.find((t) => t.id === episode?.teamId);
    return {
      ...enc,
      patientName: patient?.name,
      patientLocation: patient?.address,
      team: team?.name
    };
  });
  res.json(upcoming);
});

export default router;

import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients';
import tasksRouter from './routes/tasks';
import intakeRouter from './routes/intake';
import scheduleRouter from './routes/schedule';
import analyticsRouter from './routes/analytics';
import portalRouter from './routes/portal';
import roundsRouter from './routes/rounds';
import authRouter from './routes/auth';
import { mockAuth } from './middleware/auth';

const app = express();
app.use(cors());
app.use(express.json());
app.use(mockAuth);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/intake', intakeRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/portal', portalRouter);
app.use('/api/rounds', roundsRouter);

export default app;

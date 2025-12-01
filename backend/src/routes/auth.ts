import { Router } from 'express';
import { z } from 'zod';
import { AuthedRequest } from '../middleware/auth';
import { createUser, findUserByEmail, signToken, verifyUser } from '../services/userService';
import { jwtAuth } from '../middleware/jwtAuth';
import { Role } from '../types';

const router = Router();

const signupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  role: z.enum(['PATIENT', 'CARE_PROVIDER', 'COORDINATOR'])
});

router.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
  const { fullName, email, password, confirmPassword, role } = parsed.data;
  if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match' });
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already in use' });
    const user = await createUser(fullName, email, password, role as Role);
    const token = signToken({ id: user.id, email: user.email, role: user.role });
    res.status(201).json({ token, user: { id: user.id, fullName: user.full_name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create account' });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  try {
    const user = await verifyUser(parsed.data.email, parsed.data.password);
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const token = signToken({ id: user.id, email: user.email, role: user.role });
    res.json({ token, user: { id: user.id, fullName: user.full_name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', jwtAuth, async (req: AuthedRequest, res) => {
  res.json({ user: req.user });
});

export default router;

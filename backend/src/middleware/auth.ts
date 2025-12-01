import { Request, Response, NextFunction } from 'express';
import { Role, User } from '../types';
import { store } from '../data/store';

export interface AuthedRequest extends Request {
  user?: User;
}

const roleOrder: Role[] = ['PATIENT', 'CAREGIVER', 'NURSE', 'PHYSICIAN', 'SOCIAL_WORKER', 'CHAPLAIN', 'COORDINATOR', 'ADMIN'];

export const mockAuth = (req: AuthedRequest, _res: Response, next: NextFunction) => {
  const roleHeader = (req.header('x-user-role') as Role) ?? 'COORDINATOR';
  const userId = req.header('x-user-id');
  const user = store.users.find((u) => u.id === userId && u.role === roleHeader);
  req.user = user ?? { id: 'anonymous', name: 'Demo User', email: 'demo@local', role: roleHeader };
  next();
};

export const requireRole = (allowed: Role[]) => {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !allowed.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

export const isRoleAtLeast = (minimum: Role) => (req: AuthedRequest, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (!role) return res.status(401).json({ error: 'Unauthorized' });
  const allowed = roleOrder.indexOf(role) >= roleOrder.indexOf(minimum);
  if (!allowed) return res.status(403).json({ error: 'Insufficient role' });
  next();
};

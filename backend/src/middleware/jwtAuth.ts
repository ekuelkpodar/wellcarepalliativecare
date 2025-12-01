import { NextFunction, Response } from 'express';
import { AuthedRequest } from './auth';
import { decodeToken } from '../services/userService';

export const jwtAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing auth header' });
  const token = header.replace('Bearer ', '');
  try {
    const decoded = decodeToken(token);
    req.user = { id: decoded.sub, email: decoded.email, role: decoded.role, name: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

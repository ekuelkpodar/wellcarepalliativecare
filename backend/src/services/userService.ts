import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import { Role } from '../types';

export interface UserRecord {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: Role;
  created_at: string;
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'serenity-secret';

export const createUser = async (fullName: string, email: string, password: string, role: Role) => {
  if (!pool) throw new Error('Database not configured');
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query<UserRecord>(
    `INSERT INTO users (full_name, email, password_hash, role)
     VALUES ($1,$2,$3,$4)
     RETURNING id, full_name, email, role, created_at, password_hash`,
    [fullName, email.toLowerCase(), passwordHash, role]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  if (!pool) throw new Error('Database not configured');
  const result = await pool.query<UserRecord>('SELECT * FROM users WHERE email=$1', [email.toLowerCase()]);
  return result.rows[0];
};

export const verifyUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return user;
};

export const signToken = (user: { id: string; email: string; role: Role }) => {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { sub: string; email: string; role: Role };
};

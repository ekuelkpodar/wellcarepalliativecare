import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const pool = connectionString ? new Pool({ connectionString, ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined }) : null;

export const ensureUsersTable = async () => {
  if (!pool) {
    console.warn('DATABASE_URL not set. Auth endpoints will be unavailable.');
    return;
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT (md5(random()::text || clock_timestamp()::text))::uuid,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('PATIENT','CARE_PROVIDER','COORDINATOR')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

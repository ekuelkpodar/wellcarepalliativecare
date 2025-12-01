const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

const baseHeaders = { 'Content-Type': 'application/json' };

export type Role = 'PATIENT' | 'CARE_PROVIDER' | 'COORDINATOR';

export interface AuthPayload {
  token: string;
  user: { id: string; fullName: string; email: string; role: Role };
}

export const api = {
  async signup(data: { fullName: string; email: string; password: string; confirmPassword: string; role: Role }): Promise<AuthPayload> {
    const res = await fetch(`${API_BASE}/api/auth/signup`, { method: 'POST', headers: baseHeaders, body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error ?? 'Signup failed');
    return res.json();
  },
  async login(data: { email: string; password: string }): Promise<AuthPayload> {
    const res = await fetch(`${API_BASE}/api/auth/login`, { method: 'POST', headers: baseHeaders, body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error ?? 'Login failed');
    return res.json();
  },
  async me(token: string) {
    const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { ...baseHeaders, Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  }
};

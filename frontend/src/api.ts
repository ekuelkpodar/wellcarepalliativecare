const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

const headers = {
  'Content-Type': 'application/json',
  'x-user-role': 'COORDINATOR'
};

export const api = {
  async listPatients() {
    const res = await fetch(`${API_BASE}/api/patients`, { headers });
    return res.json();
  },
  async getPatient(id: string) {
    const res = await fetch(`${API_BASE}/api/patients/${id}`, { headers });
    return res.json();
  },
  async listIntake() {
    const res = await fetch(`${API_BASE}/api/intake`, { headers });
    return res.json();
  },
  async listSchedule() {
    const res = await fetch(`${API_BASE}/api/schedule`, { headers });
    return res.json();
  },
  async listTasks() {
    const res = await fetch(`${API_BASE}/api/tasks`, { headers });
    return res.json();
  },
  async analytics() {
    const res = await fetch(`${API_BASE}/api/analytics`, { headers });
    return res.json();
  },
  async rounds() {
    const res = await fetch(`${API_BASE}/api/rounds`, { headers });
    return res.json();
  },
  async portal(patientId: string) {
    const res = await fetch(`${API_BASE}/api/portal/${patientId}`, { headers });
    return res.json();
  }
};

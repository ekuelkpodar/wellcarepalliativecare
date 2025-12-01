import request from 'supertest';
import app from '../src/app';

describe('Patients API', () => {
  it('lists patients with risk score', async () => {
    const res = await request(app).get('/api/patients').set('x-user-role', 'COORDINATOR');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('riskScore');
  });

  it('returns a patient bundle', async () => {
    const res = await request(app).get('/api/patients/p1').set('x-user-role', 'COORDINATOR');
    expect(res.status).toBe(200);
    expect(res.body.patient.id).toBe('p1');
    expect(res.body).toHaveProperty('encounters');
  });

  it('adds symptom log with triage', async () => {
    const res = await request(app)
      .post('/api/patients/p1/symptoms')
      .set('x-user-role', 'PATIENT')
      .send({ pain: 8, dyspnea: 3, fatigue: 4 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('log.id');
    expect(res.body.triage.level).toBe('urgent');
  });
});

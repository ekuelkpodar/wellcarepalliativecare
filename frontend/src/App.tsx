import { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import './App.css';

type Patient = {
  id: string;
  name: string;
  primaryDiagnosis: string;
  codeStatus: string;
  riskScore: number;
  primaryLanguage?: string;
  livingSituation?: string;
  carePreferences?: string;
  goalsOfCare?: string;
  openTasks?: number;
  latestSymptom?: { pain?: number; dyspnea?: number; fatigue?: number };
};

type PatientBundle = {
  patient: any;
  episodes: any[];
  medications: any[];
  vitals: any[];
  symptomLogs: any[];
  functionalStatuses: any[];
  tasks: any[];
  encounters: any[];
  equipment: any[];
  transportationEvents: any[];
  utilizations: any[];
  communications: any[];
  documents: any[];
  teams: any[];
  careTeamMembers: any[];
  riskScore: number;
};

type IntakeReferral = {
  id: string;
  patientName: string;
  primaryDiagnosis: string;
  urgency: string;
  reason: string;
  status: string;
  createdAt: string;
};

const Chip = ({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'alert' | 'ok' | 'warm' }) => (
  <span className={`chip chip-${tone}`}>{label}</span>
);

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>();
  const [patientBundle, setPatientBundle] = useState<PatientBundle | null>(null);
  const [intake, setIntake] = useState<IntakeReferral[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>();
  const [rounds, setRounds] = useState<any[]>([]);
  const [portal, setPortal] = useState<any>();

  useEffect(() => {
    const load = async () => {
      const [pList, intakeData, scheduleData, taskData, analyticsData, roundsData] = await Promise.all([
        api.listPatients(),
        api.listIntake(),
        api.listSchedule(),
        api.listTasks(),
        api.analytics(),
        api.rounds()
      ]);
      setPatients(pList);
      setIntake(intakeData);
      setSchedule(scheduleData);
      setTasks(taskData);
      setAnalytics(analyticsData);
      setRounds(roundsData);
      setSelectedPatientId(pList[0]?.id);
    };
    load();
  }, []);

  useEffect(() => {
    const loadDetail = async () => {
      if (!selectedPatientId) return;
      const detail = await api.getPatient(selectedPatientId);
      setPatientBundle(detail);
      const portalData = await api.portal(selectedPatientId);
      setPortal(portalData);
    };
    loadDetail();
  }, [selectedPatientId]);

  const riskLabel = (risk?: number) => {
    if (risk === undefined) return 'unknown';
    if (risk >= 8) return 'high';
    if (risk >= 5) return 'moderate';
    return 'stable';
  };

  const todaysWork = useMemo(() => {
    const upcomingVisits = schedule.filter((enc) => enc);
    const urgentTasks = tasks.filter((t) => t.priority === 'urgent' || t.priority === 'high');
    return { upcomingVisits, urgentTasks };
  }, [schedule, tasks]);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Palliative Care 360° Platform</p>
          <h1>Unified patient, team, and operations console</h1>
          <p className="lede">
            Clinical, psychosocial, spiritual, and logistics data in one view — built for IDT collaboration and safe,
            proactive care.
          </p>
          <div className="hero-chips">
            <Chip label="Patient 360" />
            <Chip label="IDT Rounds" />
            <Chip label="Patient / Caregiver Portal" />
          </div>
        </div>
        <div className="hero-card">
          <h3>My Work Today</h3>
          <div className="stat">
            <div>
              <p className="stat-label">Urgent tasks</p>
              <p className="stat-number">{todaysWork.urgentTasks.length}</p>
            </div>
            <div>
              <p className="stat-label">Visits scheduled</p>
              <p className="stat-number">{todaysWork.upcomingVisits.length}</p>
            </div>
          </div>
          <ul className="mini-list">
            {todaysWork.urgentTasks.slice(0, 3).map((t) => (
              <li key={t.id}>
                <Chip label={t.priority} tone="alert" /> {t.title}
              </li>
            ))}
            {todaysWork.upcomingVisits.slice(0, 2).map((v) => (
              <li key={v.id}>
                <Chip label={v.type} tone="warm" /> {v.patientName} · {new Date(v.startTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Patient census</p>
              <h2>Patient List</h2>
            </div>
            <Chip label={`${patients.length} active`} />
          </header>
          <div className="list">
            {patients.map((p) => (
              <button
                key={p.id}
                className={`list-row ${selectedPatientId === p.id ? 'active' : ''}`}
                onClick={() => setSelectedPatientId(p.id)}
              >
                <div>
                  <strong>{p.name}</strong>
                  <p className="muted">
                    {p.primaryDiagnosis} · Code: {p.codeStatus}
                  </p>
                  <div className="row-chips">
                    <Chip label={`Risk: ${riskLabel(p.riskScore)}`} tone={p.riskScore >= 8 ? 'alert' : p.riskScore >= 5 ? 'warm' : 'ok'} />
                    <Chip label={`Tasks: ${p.openTasks ?? 0}`} tone="neutral" />
                  </div>
                </div>
                <span className="score">{p.riskScore}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel wide">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Patient 360°</p>
              <h2>{patientBundle?.patient?.name ?? 'Select a patient'}</h2>
            </div>
            {patientBundle && <Chip label={`Risk ${riskLabel(patientBundle.riskScore)}`} tone={patientBundle.riskScore >= 8 ? 'alert' : 'warm'} />}
          </header>
          {patientBundle && (
            <div className="patient-grid">
              <div className="card">
                <h3>Story & Goals</h3>
                <p className="muted">{patientBundle.patient.goalsOfCare}</p>
                <p className="muted">Preferences: {patientBundle.patient.carePreferences}</p>
                <div className="chips">
                  <Chip label={`Code: ${patientBundle.patient.codeStatus}`} tone="alert" />
                  <Chip label={`Language: ${patientBundle.patient.primaryLanguage ?? 'N/A'}`} />
                  <Chip label={`Setting: ${patientBundle.episodes[0]?.careSetting ?? 'home'}`} tone="warm" />
                </div>
              </div>

              <div className="card">
                <h3>Symptoms & Function</h3>
                <ul className="mini-list">
                  {patientBundle.symptomLogs.slice(-3).reverse().map((s) => (
                    <li key={s.id}>
                      {new Date(s.timestamp).toLocaleDateString()} · Pain {s.pain ?? '-'} / Dyspnea {s.dyspnea ?? '-'}{' '}
                      <span className="muted">({s.reportedBy})</span>
                    </li>
                  ))}
                  {patientBundle.functionalStatuses[0] && (
                    <li>
                      Latest function: {patientBundle.functionalStatuses[0].adlStatus} · {patientBundle.functionalStatuses[0].mobility}
                    </li>
                  )}
                </ul>
              </div>

              <div className="card">
                <h3>Medications</h3>
                <ul className="mini-list two-col">
                  {patientBundle.medications.map((m) => (
                    <li key={m.id}>
                      <strong>{m.name}</strong> {m.strength} {m.route} · {m.schedule}
                      <p className="muted">{m.indication}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3>Upcoming & Tasks</h3>
                <ul className="mini-list">
                  {patientBundle.encounters.slice(0, 3).map((v) => (
                    <li key={v.id}>
                      <Chip label={v.type} tone="warm" /> {new Date(v.startTime).toLocaleString()} · {v.discipline}
                    </li>
                  ))}
                  {patientBundle.tasks.slice(0, 3).map((t) => (
                    <li key={t.id}>
                      <Chip label={t.priority} tone={t.priority === 'urgent' ? 'alert' : 'warm'} /> {t.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <section className="panel">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Intake & triage</p>
              <h2>Referrals queue</h2>
            </div>
            <Chip label="Rules: urgent if pain >=8 or dyspnea >=7" tone="warm" />
          </header>
          <div className="list small">
            {intake.map((r) => (
              <div key={r.id} className="list-row static">
                <div>
                  <strong>{r.patientName}</strong> · {r.primaryDiagnosis}
                  <p className="muted">{r.reason}</p>
                </div>
                <div className="row-chips">
                  <Chip label={r.urgency} tone={r.urgency.toLowerCase().includes('same') ? 'alert' : 'warm'} />
                  <Chip label={r.status} />
                  <Chip label={new Date(r.createdAt).toLocaleDateString()} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Scheduling</p>
              <h2>Visits board</h2>
            </div>
            <Chip label="RN / MD / SW / CH" />
          </header>
          <div className="list small">
            {schedule.map((v) => (
              <div key={v.id} className="list-row static">
                <div>
                  <strong>{v.patientName}</strong> · {v.type}
                  <p className="muted">{v.notes ?? v.location}</p>
                </div>
                <div className="row-chips">
                  <Chip label={new Date(v.startTime).toLocaleString()} />
                  <Chip label={v.team ?? 'Unassigned'} tone="warm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Inbox & tasks</p>
              <h2>Team workload</h2>
            </div>
            <Chip label={`${tasks.length} items`} />
          </header>
          <div className="list small">
            {tasks.map((t) => (
              <div key={t.id} className="list-row static">
                <div>
                  <strong>{t.title}</strong> · {t.category}
                  <p className="muted">{t.description}</p>
                </div>
                <div className="row-chips">
                  <Chip label={t.priority} tone={t.priority === 'urgent' ? 'alert' : 'warm'} />
                  <Chip label={t.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Rounds</p>
              <h2>Interdisciplinary board</h2>
            </div>
            <Chip label="Weekly IDT" />
          </header>
          <div className="table">
            <div className="table-head">
              <span>Name</span>
              <span>Diagnosis</span>
              <span>Risk</span>
              <span>Signal</span>
              <span>Disposition</span>
            </div>
            {rounds.map((r) => (
              <div key={r.id} className="table-row">
                <span>{r.name}</span>
                <span>{r.diagnosis}</span>
                <span>
                  <Chip label={r.riskScore >= 8 ? 'High' : 'Moderate'} tone={r.riskScore >= 8 ? 'alert' : 'warm'} />
                </span>
                <span>
                  <div className="sparkline">
                    {r.sparkline.map((v: number, idx: number) => (
                      <span key={idx} style={{ height: `${v * 5}px` }} />
                    ))}
                  </div>
                </span>
                <span className="muted">{r.disposition}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Program analytics</p>
              <h2>Quality & ops</h2>
            </div>
            <Chip label="Admin view" />
          </header>
          {analytics && (
            <div className="analytics">
              <div className="stat">
                <div>
                  <p className="stat-label">Census</p>
                  <p className="stat-number">{analytics.census}</p>
                </div>
                <div>
                  <p className="stat-label">Severe symptoms</p>
                  <p className="stat-number">{analytics.symptomsSevere}</p>
                </div>
                <div>
                  <p className="stat-label">Open intake</p>
                  <p className="stat-number">{analytics.intakeAging}</p>
                </div>
              </div>
              <div className="muted">Risk distribution: High {analytics.riskBuckets.high} · Medium {analytics.riskBuckets.medium} · Low {analytics.riskBuckets.low}</div>
            </div>
          )}
        </section>

        <section className="panel">
          <header className="panel-header">
            <div>
              <p className="eyebrow">Patient / caregiver portal</p>
              <h2>What patients see</h2>
            </div>
            <Chip label="Mobile friendly" tone="ok" />
          </header>
          {portal ? (
            <div className="portal">
              <div>
                <h3>Next visits</h3>
                <ul className="mini-list">
                  {portal.nextVisits.map((v: any) => (
                    <li key={v.id}>
                      <Chip label={v.type} tone="warm" /> {new Date(v.startTime).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Care plan</h3>
                <p className="muted">{portal.carePlan}</p>
                <h4>Medications</h4>
                <ul className="mini-list two-col">
                  {portal.medications.map((m: any) => (
                    <li key={m.id}>
                      {m.name} {m.strength} · {m.schedule}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Education</h3>
                <ul className="mini-list">
                  {portal.education.map((e: string, idx: number) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="muted">Loading portal...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

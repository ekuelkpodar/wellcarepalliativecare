# Palliative Care 360° Platform

Full-stack demo for a unified palliative care operating system: Patient 360, intake/triage, scheduling, IDT rounds, tasks/inbox, analytics, and a patient/caregiver portal.

## Stack
- Backend: Node.js + TypeScript + Express with in-memory seeded data (no DB required for the demo). Jest + Supertest for API smoke tests.
- Frontend: React + Vite + TypeScript, responsive dark UI.

## Quick start
```bash
# Backend
cd backend
npm install
npm run dev        # http://localhost:4000
# optional: npm test

# Frontend
cd ../frontend
npm install
VITE_API_URL=http://localhost:4000 npm run dev   # http://localhost:5173
```

## Feature map
- **Patient 360°**: demographics, goals, meds, vitals, symptoms, function, encounters, tasks, equipment, documents, care team.
- **Intake & triage**: referral queue, urgency/status, assign to teams.
- **Scheduling**: visit board by patient/discipline with location hints.
- **Inbox & tasks**: filterable tasks with priority/status.
- **Rounds board**: IDT-ready list with risk, sparkline of symptom trend, disposition notes.
- **Analytics**: census, severe symptoms count, intake load, risk distribution.
- **Portal view**: next visits, simplified care plan, meds, education; mobile-friendly styling.
- **Assistive AI-ish rules**: simple triage helper (pain/dyspnea to urgent/priority/routine), composite risk scoring combining symptoms, function, and utilization.

## Security / RBAC (conceptual)
- Mock auth via headers: `x-user-role` and optional `x-user-id`. Role checks gate task creation and intake actions.
- Patients/caregivers are scoped to their own patient record for list/detail routes.
- Logs and PHI markers noted in code comments to harden later (add real auth, audit logging, encryption, etc.).

## Data model (seeded in-memory)
- Core entities: Patient, CareEpisode, Encounter, SymptomLog, FunctionalStatus, Medication, Vital, Task, Communication, Document, EquipmentOrder, TransportationEvent, Utilization, IntakeReferral, CareTeamMember, InterdisciplinaryTeam, Organization, User.
- 10 sample patients with varied diagnoses/states, multi-discipline teams, encounters, symptoms, tasks, intake referrals, equipment, transport, and utilization events.

## API (samples)
- `GET /api/patients` — list with risk flags and open task counts.
- `GET /api/patients/:id` — full patient bundle.
- `POST /api/patients/:id/symptoms` — add symptom log + triage suggestion.
- `GET /api/tasks` / `POST /api/tasks` — task views and creation (role-gated).
- `GET /api/intake` / `POST /api/intake/:id/assign` — intake queue + assignment.
- `GET /api/schedule` — visit board.
- `GET /api/rounds` — IDT board.
- `GET /api/analytics` — quality/ops metrics.
- `GET /api/portal/:patientId` — patient/caregiver portal payload.

## Frontend highlights
- Bold, dark UI with chips/sparklines and responsive grid.
- Landing hero with “My Work Today” (urgent tasks + visits).
- Patient list + Patient 360 panel; cards for symptoms/function/meds/tasks.
- Dedicated panels: Intake queue, Scheduling board, Inbox/Tasks, Rounds, Analytics, Portal preview.

## Tests
- Backend: `npm test` runs Jest + Supertest smoke tests for core patient endpoints and symptom triage.

## Next steps
- Swap in a real DB (Postgres) with Prisma migrations; add auth provider + audit logging.
- Add write endpoints for encounters/tasks/status changes and websocket notifications.
- Expand analytics (time-to-first-visit, ED/hospital trends pre/post enrollment, workload by discipline).

# SerenityCare 360

Unified palliative care platform demo with a production-style landing page, Postgres-backed auth (patients, care providers, coordinators), and seeded clinical/workflow APIs.

## Stack
- Backend: Node.js + TypeScript + Express; Postgres for auth users; in-memory demo data for clinical entities; Jest + Supertest for API smoke tests.
- Frontend: React + Vite + TypeScript; responsive healthcare-style marketing + auth flows.

## Quick start
```bash
# Backend
cd backend
npm install
cp .env.example .env         # update DATABASE_URL & JWT_SECRET
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/serenitycare npm run dev
# optional: npm test

# Frontend
cd ../frontend
npm install
VITE_API_URL=http://localhost:4000 npm run dev   # http://localhost:5173
```

## Auth / database
- Postgres users table created automatically on server start (requires `DATABASE_URL`).
- Endpoint summary:
  - `POST /api/auth/signup` — fullName, email, password, confirmPassword, role (`PATIENT` | `CARE_PROVIDER` | `COORDINATOR`).
  - `POST /api/auth/login`
  - `GET /api/auth/me` (Bearer token)
- Roles drive post-login dashboard messaging and future gating.

## Marketing landing page
- Nav anchors, hero with role CTAs, “How it works”, role-specific panels, feature grid, security/compliance, testimonials, final CTA, footer + emergency disclaimer.
- Calm healthcare theme (soft blues/teal, high-contrast text), responsive for desktop/tablet/mobile.

## Clinical demo API (existing)
- Patient 360 bundle, intake queue, schedule board, tasks/inbox, rounds board, analytics, portal payload (non-authenticated demo endpoints using mock headers).
- Key routes: `/api/patients`, `/api/patients/:id`, `/api/patients/:id/symptoms`, `/api/tasks`, `/api/intake`, `/api/schedule`, `/api/rounds`, `/api/analytics`, `/api/portal/:patientId`.

## Frontend flows
- Signup/login modals with role selection; JWT stored locally; lightweight role dashboards (patient/provider/coordinator) to differentiate experiences.
- Landing page sections map to scroll anchors for marketing nav.

## Tests
- Backend: `npm test` (Jest + Supertest) covers patient endpoints and symptom triage.

## Notes / next steps
- Harden auth routes (rate limits, email verification, password reset).
- Add real RBAC to clinical endpoints and replace in-memory data with Postgres models/migrations.
- Deploy with SSL-enabled Postgres and production-grade JWT secret management.

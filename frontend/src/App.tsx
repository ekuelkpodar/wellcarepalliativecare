import { type FormEvent, useEffect, useState } from 'react';
import { api, type Role } from './api';
import './App.css';

type Mode = 'landing' | 'login' | 'signup' | 'dashboard';

interface AuthState {
  token: string;
  user: { id: string; fullName: string; email: string; role: Role };
}

const roleCopy: Record<Role, { title: string; blurb: string; accent: string }> = {
  PATIENT: { title: 'Patient & Family', blurb: 'See your plan, your team, and what to expect next.', accent: '#0ea5e9' },
  CARE_PROVIDER: { title: 'Care Provider', blurb: 'Unified view of patients, symptoms, and tasks.', accent: '#10b981' },
  COORDINATOR: { title: 'Coordinator', blurb: 'Manage referrals, schedules, and assignments.', accent: '#a855f7' }
};

const RolePill = ({ role, selected, onClick }: { role: Role; selected: boolean; onClick: () => void }) => (
  <button className={`pill ${selected ? 'pill-active' : ''}`} style={{ borderColor: roleCopy[role].accent }} onClick={onClick}>
    {roleCopy[role].title}
  </button>
);

function App() {
  const [mode, setMode] = useState<Mode>('landing');
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [role, setRole] = useState<Role>('PATIENT');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('sc_token');
    const user = localStorage.getItem('sc_user');
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
      setMode('dashboard');
    }
  }, []);

  const resetForms = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await api.signup({ fullName, email, password, confirmPassword, role });
      localStorage.setItem('sc_token', result.token);
      localStorage.setItem('sc_user', JSON.stringify(result.user));
      setAuth(result);
      setMode('dashboard');
      resetForms();
    } catch (err: any) {
      setError(err.message ?? 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await api.login({ email, password });
      localStorage.setItem('sc_token', result.token);
      localStorage.setItem('sc_user', JSON.stringify(result.user));
      setAuth(result);
      setMode('dashboard');
      resetForms();
    } catch (err: any) {
      setError(err.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sc_token');
    localStorage.removeItem('sc_user');
    setAuth(null);
    setMode('landing');
  };

  const renderLanding = () => (
    <>
      <main>
        <section id="home" className="hero">
          <div>
            <p className="eyebrow">Unified Palliative Care Platform</p>
            <h1>Unified palliative care, centered on what matters most.</h1>
            <p className="lede">Connect patients, care providers, and coordinators in one secure place for calm, coordinated support.</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => setMode('signup')}>
                Sign Up as Patient
              </button>
              <button className="secondary" onClick={() => setMode('signup')}>
                Sign Up as Care Provider
              </button>
              <button className="secondary" onClick={() => setMode('signup')}>
                Sign Up as Coordinator
              </button>
            </div>
            <p className="muted link" onClick={() => setMode('login')}>
              Already have an account? Log in
            </p>
            <div className="trust">
              <span>Designed for palliative & serious illness teams</span>
              <span>•</span>
              <span>HIPAA-conscious architecture</span>
            </div>
          </div>
          <div className="hero-card">
            <p className="eyebrow">Role-based access</p>
            <h3>Patients, Providers, Coordinators</h3>
            <p className="muted">One secure hub for care plans, visits, and communication.</p>
            <div className="badges">
              <span>Patient 360°</span>
              <span>Secure Messaging</span>
              <span>Visit Scheduling</span>
            </div>
          </div>
        </section>

        <section id="how" className="section">
          <div className="section-header">
            <p className="eyebrow">How it works</p>
            <h2>Smoother coordination in three steps</h2>
          </div>
          <div className="steps">
            <div className="card">
              <span className="step-number">1</span>
              <h3>Create your account</h3>
              <p className="muted">Choose your role and set up secure access for your team.</p>
            </div>
            <div className="card">
              <span className="step-number">2</span>
              <h3>Connect your care team</h3>
              <p className="muted">Patients, providers, and coordinators share the same up-to-date view.</p>
            </div>
            <div className="card">
              <span className="step-number">3</span>
              <h3>Coordinate in one place</h3>
              <p className="muted">Scheduling, messaging, and care plan highlights with gentle reminders.</p>
            </div>
          </div>
        </section>

        <section id="patients" className="section role-grid">
          <div className="role-card">
            <p className="eyebrow">For patients & families</p>
            <h3>Stay oriented and heard</h3>
            <p className="muted">
              See your plan, your care team, and what to expect next. Keep your story, preferences, and goals visible to everyone.
            </p>
            <ul>
              <li>Know who to call and when.</li>
              <li>Get reminders for visits and medications.</li>
              <li>Securely message your team for non-urgent questions.</li>
            </ul>
            <button className="primary" onClick={() => setMode('signup')}>
              Sign Up as Patient
            </button>
          </div>
          <div id="providers" className="role-card">
            <p className="eyebrow">For care providers</p>
            <h3>Arrive prepared, collaborate faster</h3>
            <p className="muted">Unified patient view with symptoms, function, and tasks at a glance.</p>
            <ul>
              <li>See your patient panel in one place.</li>
              <li>Prep for visits faster with current data.</li>
              <li>Collaborate with nurses, social workers, chaplains, and coordinators.</li>
            </ul>
            <button className="secondary" onClick={() => setMode('signup')}>
              Sign Up as Care Provider
            </button>
          </div>
          <div id="coordinators" className="role-card">
            <p className="eyebrow">For coordinators</p>
            <h3>Keep schedules and referrals on track</h3>
            <p className="muted">Centralize intake, assign visits, and reduce missed appointments.</p>
            <ul>
              <li>Manage referrals and intake in one queue.</li>
              <li>Balance caseloads across teams.</li>
              <li>Track who is assigned and when they’re visiting.</li>
            </ul>
            <button className="secondary" onClick={() => setMode('signup')}>
              Sign Up as Coordinator
            </button>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-header">
            <p className="eyebrow">Platform features</p>
            <h2>Built for compassionate, coordinated care</h2>
          </div>
          <div className="feature-grid">
            {[
              { title: 'Patient 360° View', desc: 'Care plans, symptoms, function, and contacts in one place.' },
              { title: 'Secure Messaging', desc: 'Non-urgent communication that keeps everyone aligned.' },
              { title: 'Visit Scheduling', desc: 'Home and telehealth visits with role-based assignments.' },
              { title: 'Care Plan Summaries', desc: 'Goals of care and preferences up front, not buried.' },
              { title: 'Alerts & Reminders', desc: 'Gentle cues for urgent symptoms and upcoming visits.' },
              { title: 'Analytics (Coming Soon)', desc: 'Census, ED visits, time-to-first-visit, and quality metrics.' }
            ].map((f) => (
              <div key={f.title} className="card feature-card">
                <h3>{f.title}</h3>
                <p className="muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="security" className="section security">
          <div>
            <p className="eyebrow">Security & compliance</p>
            <h2>Designed with privacy and trust in mind</h2>
            <p className="muted">
              Role-based access, encryption in transit and at rest (with proper deployment), and audit-ready logging paths for future hardening.
            </p>
            <div className="badges">
              <span>Role-Based Access</span>
              <span>Encryption in Transit</span>
              <span>Audit Trails</span>
            </div>
          </div>
          <div className="card security-card">
            <h3>We’re not an emergency service</h3>
            <p className="muted">For emergencies, call 911 or your local emergency number.</p>
            <p className="muted">SerenityCare 360 is built for coordinated, non-urgent palliative care.</p>
          </div>
        </section>

        <section className="section testimonials">
          <div className="section-header">
            <p className="eyebrow">Voices</p>
            <h2>Placeholder words from people we serve</h2>
          </div>
          <div className="testimonial-grid">
            <blockquote>
              “I finally know who’s coming and when. It’s calmer at home.” <span>— Sample Patient</span>
            </blockquote>
            <blockquote>
              “My visits start with the full picture, not a guessing game.” <span>— Sample Nurse</span>
            </blockquote>
            <blockquote>
              “Referrals and schedules aren’t stuck in spreadsheets anymore.” <span>— Sample Coordinator</span>
            </blockquote>
          </div>
        </section>

        <section className="section final-cta" id="contact">
          <div>
            <h2>Ready to bring your palliative care team together?</h2>
            <p className="muted">Create your account and choose your role to get started.</p>
          </div>
          <div className="hero-actions">
            <button className="primary" onClick={() => setMode('signup')}>
              Sign Up as Patient
            </button>
            <button className="secondary" onClick={() => setMode('signup')}>
              Sign Up as Care Provider
            </button>
            <button className="secondary" onClick={() => setMode('signup')}>
              Sign Up as Coordinator
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} SerenityCare 360</div>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#security">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="muted small">If this is an emergency, call 911 or your local emergency number.</div>
      </footer>
    </>
  );

  const renderDashboardContent = () => {
    if (!auth) return null;
    if (auth.user.role === 'PATIENT') {
      return (
        <>
          <div className="dash-hero" style={{ borderColor: roleCopy.PATIENT.accent }}>
            <p className="eyebrow">Patient home</p>
            <h2>Hello {auth.user.fullName}</h2>
            <p className="muted">Your care plan, reminders, and team are all here.</p>
          </div>
          <div className="dash-grid">
            <div className="card stat-card">
              <h4>Upcoming visits</h4>
              <ul className="mini-list">
                <li>RN home visit · Tomorrow 10:00 AM</li>
                <li>Telehealth with provider · Fri 2:00 PM</li>
              </ul>
            </div>
            <div className="card stat-card">
              <h4>Care plan highlights</h4>
              <ul className="mini-list">
                <li>Goal: Stay comfortable at home, avoid ED if possible.</li>
                <li>Preferences: Quiet mornings, prefers phone updates.</li>
              </ul>
            </div>
            <div className="card stat-card">
              <h4>Your care team</h4>
              <ul className="mini-list">
                <li>Nurse Riley · riley@wellcare.com</li>
                <li>Dr. Stone · stone@wellcare.com</li>
                <li>Coordinator Kay · kay@wellcare.com</li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    if (auth.user.role === 'CARE_PROVIDER') {
      return (
        <>
          <div className="dash-hero" style={{ borderColor: roleCopy.CARE_PROVIDER.accent }}>
            <p className="eyebrow">Provider home</p>
            <h2>Welcome back, {auth.user.fullName}</h2>
            <p className="muted">Your panel, today’s visits, and alerts in one place.</p>
          </div>
          <div className="dash-grid">
            <div className="card stat-card">
              <h4>Today’s visits</h4>
              <ul className="mini-list">
                <li>Eleanor Brooks · Home visit · 10:00 AM</li>
                <li>Robert Chen · Telehealth · 1:00 PM</li>
              </ul>
            </div>
            <div className="card stat-card">
              <h4>Patient panel (snapshot)</h4>
              <ul className="mini-list">
                <li>High priority: 2 patients with pain ≥7</li>
                <li>Risk alerts: ED risk flagged on 3 patients</li>
              </ul>
            </div>
            <div className="card stat-card">
              <h4>Tasks & follow-ups</h4>
              <ul className="mini-list">
                <li>Call palliative RN about diuretic titration</li>
                <li>Review POLST for Linda Garcia</li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="dash-hero" style={{ borderColor: roleCopy.COORDINATOR.accent }}>
          <p className="eyebrow">Coordinator home</p>
          <h2>Hi {auth.user.fullName}</h2>
          <p className="muted">Referrals, schedules, and assignments at a glance.</p>
        </div>
        <div className="dash-grid">
          <div className="card stat-card">
            <h4>Referral queue</h4>
            <ul className="mini-list">
              <li>Julia Perez · CHF · Urgency: 24-48h</li>
              <li>Sean Murphy · Dementia · Urgency: Routine</li>
            </ul>
          </div>
          <div className="card stat-card">
            <h4>Schedule highlights</h4>
            <ul className="mini-list">
              <li>RN coverage needed · Thursday AM</li>
              <li>Telehealth slots · Friday PM</li>
            </ul>
          </div>
          <div className="card stat-card">
            <h4>Assignments</h4>
            <ul className="mini-list">
              <li>Assign chaplain for Linda Garcia (hospice transition)</li>
              <li>Confirm transport for Noah Patel dialysis ride</li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const renderDashboard = () => (
    <main className="dashboard">
      {renderDashboardContent()}
      <div className="muted small dash-footnote">This is a role-based placeholder dashboard; extend with live data next.</div>
    </main>
  );

  return (
    <div className="page">
      <header className="nav">
        <div className="logo">SerenityCare 360</div>
        {!auth && (
          <nav>
            <a href="#home">Home</a>
            <a href="#how">How It Works</a>
            <a href="#patients">For Patients</a>
            <a href="#providers">For Providers</a>
            <a href="#coordinators">For Coordinators</a>
            <a href="#security">Security</a>
            <a href="#contact">Contact</a>
          </nav>
        )}
        <div className="nav-actions">
          {auth ? (
            <>
              <span className="chip" style={{ borderColor: roleCopy[auth.user.role].accent }}>{roleCopy[auth.user.role].title}</span>
              <button className="ghost" onClick={logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="ghost" onClick={() => setMode('login')}>
                Log In
              </button>
              <button className="primary" onClick={() => setMode('signup')}>
                Get Started
              </button>
            </>
          )}
        </div>
      </header>

      {auth && mode === 'dashboard' ? renderDashboard() : renderLanding()}

      {mode === 'signup' && (
        <div className="modal">
          <div className="modal-card">
            <div className="modal-head">
              <h3>Create your account</h3>
              <p className="muted">Choose your role to tailor your dashboard.</p>
            </div>
            <div className="pill-row">
              {(['PATIENT', 'CARE_PROVIDER', 'COORDINATOR'] as Role[]).map((r) => (
                <RolePill key={r} role={r} selected={role === r} onClick={() => setRole(r)} />
              ))}
            </div>
            <form onSubmit={handleSignup} className="form">
              <label>
                Full name
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </label>
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Password
                <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label>
                Confirm password
                <input type="password" minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </label>
              {error && <div className="error">{error}</div>}
              <button className="primary block" type="submit" disabled={loading}>
                {loading ? 'Creating your account...' : 'Create account'}
              </button>
              <p className="muted link" onClick={() => setMode('login')}>
                Already have an account? Log in
              </p>
            </form>
          </div>
        </div>
      )}

      {mode === 'login' && (
        <div className="modal">
          <div className="modal-card">
            <div className="modal-head">
              <h3>Log in</h3>
              <p className="muted">Welcome back to SerenityCare 360.</p>
            </div>
            <form onSubmit={handleLogin} className="form">
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Password
                <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              {error && <div className="error">{error}</div>}
              <button className="primary block" type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Log in'}
              </button>
              <p className="muted">Forgot password? (Coming soon)</p>
              <p className="muted link" onClick={() => setMode('signup')}>
                Need an account? Sign up
              </p>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

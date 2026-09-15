import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { Role } from '@/lib/demo-store';

const NAV: Record<Role, Array<{ to: string; label: string }>> = {
  idp: [
    { to: '/idp', label: 'IdP operations' },
    { to: '/idp/attributes', label: 'Attribute registry' },
    { to: '/idp/issue', label: 'Issue / refuse' },
    { to: '/idp/refresh', label: 'CDD refresh' },
    { to: '/idp/screening', label: 'Screening' },
  ],
  rp: [
    { to: '/rp', label: 'RP request console' },
  ],
  operator: [
    { to: '/ops', label: 'Directory' },
    { to: '/ops/settlement', label: 'Settlement' },
    { to: '/ops/disputes', label: 'Disputes' },
  ],
  subject: [
    { to: '/subject', label: 'Consent portal' },
  ],
  compliance: [
    { to: '/compliance', label: 'Evidence packs' },
    { to: '/ops/disputes', label: 'Disputes' },
  ],
};

export function AppShell({
  role,
  onLogout,
}: {
  role: Role;
  onLogout: () => void;
}) {
  const navigate = useNavigate();
  const links = NAV[role];

  return (
    <div className="app-shell">
      <aside className="app-nav">
        <h1>Kyvora</h1>
        <div className="seal">NETWORK SEAL · reusable KYC</div>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ marginTop: 24 }} className="stack">
          <button
            className="btn btn-ghost"
            type="button"
            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}
            onClick={() => {
              onLogout();
              navigate('/login');
            }}
          >
            Switch role
          </button>
        </div>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

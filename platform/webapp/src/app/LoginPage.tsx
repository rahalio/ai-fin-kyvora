import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Role } from '@/lib/demo-store';

const ROLES: Array<{ id: Role; label: string; home: string }> = [
  { id: 'idp', label: 'KYC ops (IdP)', home: '/idp' },
  { id: 'rp', label: 'RP onboarding', home: '/rp' },
  { id: 'subject', label: 'Subject consent', home: '/subject' },
  { id: 'operator', label: 'Network operator', home: '/ops' },
  { id: 'compliance', label: 'Compliance', home: '/compliance' },
];

export function LoginPage({
  role,
  onSelect,
}: {
  role: Role;
  onSelect: (role: Role) => void;
}) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Role>(role);

  return (
    <div className="login-page">
      <div className="panel login-card stack">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>
            Reusable KYC attestations with liability
          </h2>
          <p className="muted">
            Kyvora is a sealed notary desk for consortium identity exchange — not a
            selfie wallet.
          </p>
        </div>
        <div className="role-pills">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={selected === r.id ? 'active' : undefined}
              onClick={() => setSelected(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <button
          className="btn btn-brass"
          type="button"
          onClick={() => {
            onSelect(selected);
            const home = ROLES.find((r) => r.id === selected)?.home ?? '/idp';
            navigate(home);
          }}
        >
          Enter console
        </button>
      </div>
    </div>
  );
}

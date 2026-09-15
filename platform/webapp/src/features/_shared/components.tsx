import type { AttestationDraft } from '@/lib/demo-store';

export function AttestationCertificate({ a }: { a: AttestationDraft }) {
  return (
    <div className="certificate">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3>Attestation certificate</h3>
        <span className="badge badge-brass">{a.requiredAssurance}</span>
      </div>
      <div className="stack">
        <div>
          <div className="muted">Attestation id</div>
          <div className="mono">{a.id}</div>
        </div>
        <div className="grid-2">
          <div>
            <div className="muted">Purpose</div>
            <div>{a.purpose}</div>
          </div>
          <div>
            <div className="muted">Relying party</div>
            <div className="mono">{a.relyingPartyId}</div>
          </div>
          <div>
            <div className="muted">Status</div>
            <div>{a.status}</div>
          </div>
          <div>
            <div className="muted">Consent</div>
            <div>{a.consentAt ?? '—'}</div>
          </div>
        </div>
        <LiabilityClauseBlock bearer={a.liabilityBearer} />
        <ScreeningFreshnessBadge status={a.screeningStatus} />
        <div>
          <div className="muted">Attributes</div>
          <div>{a.allowedAttributes.join(', ') || '—'}</div>
        </div>
        {a.refuseReason ? (
          <div className="badge badge-refuse">Refused: {a.refuseReason}</div>
        ) : null}
      </div>
    </div>
  );
}

export function MinimisationDiff({
  requested,
  allowed,
}: {
  requested: string[];
  allowed: string[];
}) {
  const over = requested.filter((x) => !allowed.includes(x));
  return (
    <div className="panel" style={{ padding: 16 }}>
      <strong>Minimisation gate</strong>
      <div className="grid-2" style={{ marginTop: 12 }}>
        <div>
          <div className="muted">Requested</div>
          <ul>
            {requested.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="muted">Allowed for purpose</div>
          <ul>
            {allowed.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      {over.length ? (
        <div className="badge badge-refuse" style={{ marginTop: 8 }}>
          Over-broad: {over.join(', ')}
        </div>
      ) : (
        <div className="badge badge-valid" style={{ marginTop: 8 }}>
          Within purpose
        </div>
      )}
    </div>
  );
}

export function LiabilityClauseBlock({
  bearer,
}: {
  bearer: 'identityProvider' | 'relyingParty' | 'subject';
}) {
  return (
    <div>
      <div className="muted">Liability allocation</div>
      <div className="mono">bearer={bearer} · ruleRef=KYVORA.RULEBOOK.v1</div>
    </div>
  );
}

export function ScreeningFreshnessBadge({
  status,
}: {
  status: 'clear' | 'stale' | 'hit';
}) {
  const cls =
    status === 'clear'
      ? 'badge-valid'
      : status === 'stale'
        ? 'badge-refuse'
        : 'badge-amber';
  return <span className={`badge ${cls}`}>Screening: {status}</span>;
}

export function ConsentGrantCard({
  purpose,
  attributes,
  onApprove,
  onRevoke,
  status,
}: {
  purpose: string;
  attributes: string[];
  status: string;
  onApprove?: () => void;
  onRevoke?: () => void;
}) {
  return (
    <div className="panel" style={{ padding: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>{purpose}</strong>
        <span className="badge badge-brass">{status}</span>
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        Attributes
      </div>
      <div>{attributes.join(', ')}</div>
      <div className="row" style={{ marginTop: 12 }}>
        {onApprove ? (
          <button className="btn btn-valid" type="button" onClick={onApprove}>
            Approve
          </button>
        ) : null}
        {onRevoke ? (
          <button className="btn btn-refuse" type="button" onClick={onRevoke}>
            Revoke
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function DisputeFreezeBanner({
  attestationId,
}: {
  attestationId: string;
}) {
  return (
    <div className="badge badge-refuse" role="status">
      Dependent onboardings frozen for {attestationId}
    </div>
  );
}

export function IaaSInvoiceLine({
  period,
  amount,
  count,
}: {
  period: string;
  amount: string;
  count: number;
}) {
  return (
    <tr>
      <td className="mono">{period}</td>
      <td>{count} attestations</td>
      <td>{amount}</td>
      <td>
        <span className="badge badge-amber">open</span>
      </td>
    </tr>
  );
}

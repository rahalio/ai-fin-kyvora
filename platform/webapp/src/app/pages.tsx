import {
  AttestationCertificate,
  MinimisationDiff,
  ScreeningFreshnessBadge,
  ConsentGrantCard,
  DisputeFreezeBanner,
  IaaSInvoiceLine,
} from '@/features/_shared/components';
import type { DemoState } from '@/lib/demo-store';
import { uid } from '@/lib/demo-store';
import { DirectoryView } from '@/features/directory/views/DirectoryView';
import { SubjectsView } from '@/features/subjects/views/SubjectsView';
import { ConsentsView } from '@/features/consents/views/ConsentsView';
import { AttestationsView } from '@/features/attestations/views/AttestationsView';
import { ScreeningView } from '@/features/screening/views/ScreeningView';
import { DisputesView } from '@/features/disputes/views/DisputesView';
import { SettlementView } from '@/features/settlement/views/SettlementView';
import { AuditView } from '@/features/audit/views/AuditView';

export function IdpHome({ state }: { state: DemoState }) {
  const pending = state.attestations.filter((a) => a.status === 'pending').length;
  const issued = state.attestations.filter((a) => a.status === 'issued').length;
  return (
    <div className="stack">
      <div className="panel">
        <h2>IdP operations</h2>
        <p className="muted">
          Issue reusable attestations from existing CDD — refresh queues and refuse
          over-broad requests.
        </p>
        <div className="grid-2">
          <div className="panel" style={{ padding: 16 }}>
            <div className="muted">Attestation volume</div>
            <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)' }}>
              {issued} issued · {pending} pending
            </div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div className="muted">IaaS fee income (demo)</div>
            <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)' }}>
              $4,280
            </div>
          </div>
        </div>
      </div>
      <AttestationsView />
    </div>
  );
}

export function AttributeRegistryPage({ state }: { state: DemoState }) {
  return (
    <div className="stack">
      <div className="panel">
        <h2>Attribute registry</h2>
        <p className="muted">
          Verified attributes with provenance — scoped IdP view, not a network honeypot.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Assurance</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {state.attributes.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>
                  <span className="badge badge-brass">{a.assurance}</span>
                </td>
                <td className="mono">{a.verifiedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SubjectsView />
    </div>
  );
}

export function IssueRefusePage({
  state,
  onChange,
}: {
  state: DemoState;
  onChange: (s: DemoState) => void;
}) {
  const draft = state.attestations[0];
  if (!draft) {
    return (
      <div className="panel">
        <h2>Issue queue empty</h2>
      </div>
    );
  }
  const overBroad = draft.requestedAttributes.some(
    (x) => !draft.allowedAttributes.includes(x)
  );

  return (
    <div className="stack">
      <div className="panel stack">
        <h2>Attestation issue / refuse</h2>
        <MinimisationDiff
          requested={draft.requestedAttributes}
          allowed={draft.allowedAttributes}
        />
        <AttestationCertificate a={draft} />
        <div className="row">
          <button
            className="btn btn-valid"
            type="button"
            disabled={overBroad || draft.screeningStatus === 'stale'}
            onClick={() => {
              const next = { ...state };
              next.attestations = state.attestations.map((a) =>
                a.id === draft.id
                  ? {
                      ...a,
                      status: 'issued' as const,
                      consentAt: new Date().toISOString(),
                      allowedAttributes: a.allowedAttributes,
                    }
                  : a
              );
              onChange(next);
            }}
          >
            Issue signed attestation
          </button>
          <button
            className="btn btn-refuse"
            type="button"
            onClick={() => {
              const next = { ...state };
              next.attestations = state.attestations.map((a) =>
                a.id === draft.id
                  ? {
                      ...a,
                      status: 'refused' as const,
                      refuseReason: overBroad
                        ? 'Over-broad attributes beyond purpose'
                        : 'Incomplete BR-1 fields',
                    }
                  : a
              );
              onChange(next);
            }}
          >
            Refuse
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => {
              const next = { ...state };
              next.attestations = state.attestations.map((a) =>
                a.id === draft.id
                  ? {
                      ...a,
                      requestedAttributes: a.allowedAttributes,
                    }
                  : a
              );
              onChange(next);
            }}
          >
            Narrow attributes
          </button>
        </div>
      </div>
    </div>
  );
}

export function RefreshPage() {
  return (
    <div className="stack">
      <div className="panel">
        <h2>CDD refresh cycles</h2>
        <p className="muted">
          Time-boxed expiry and forced re-verify on material change — not verify once
          forever.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Due</th>
              <th>Signal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="mono">sub_demo</td>
              <td>2026-09-30</td>
              <td>address change</td>
              <td>
                <span className="badge badge-amber">scheduled</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ScreeningPage({
  state,
  onChange,
}: {
  state: DemoState;
  onChange: (s: DemoState) => void;
}) {
  const draft = state.attestations[0];
  return (
    <div className="stack">
      <div className="panel stack">
        <h2>Screening freshness</h2>
        <p className="muted">
          Stale sanctions/PEP status cannot travel as a clean attestation.
        </p>
        {draft ? <ScreeningFreshnessBadge status={draft.screeningStatus} /> : null}
        <div className="row">
          <button
            className="btn btn-brass"
            type="button"
            onClick={() => {
              if (!draft) return;
              onChange({
                ...state,
                attestations: state.attestations.map((a) =>
                  a.id === draft.id ? { ...a, screeningStatus: 'clear' } : a
                ),
              });
            }}
          >
            Refresh screen
          </button>
          <button
            className="btn btn-refuse"
            type="button"
            onClick={() => {
              if (!draft) return;
              onChange({
                ...state,
                attestations: state.attestations.map((a) =>
                  a.id === draft.id
                    ? { ...a, screeningStatus: 'stale', status: 'revoked' }
                    : a
                ),
              });
            }}
          >
            Mark stale & invalidate
          </button>
        </div>
        <ScreeningView />
      </div>
    </div>
  );
}

export function RpConsole({
  state,
  onChange,
}: {
  state: DemoState;
  onChange: (s: DemoState) => void;
}) {
  const accepted = state.attestations.find((a) => a.status === 'issued');
  return (
    <div className="stack">
      <div className="panel stack">
        <h2>RP onboarding request</h2>
        <p className="muted">
          Request purpose-scoped attestation at stated assurance. Document re-collection
          requires a recorded exception when a valid attestation exists.
        </p>
        <div className="grid-2">
          <div className="field">
            <label>Purpose</label>
            <input defaultValue="account_opening" />
          </div>
          <div className="field">
            <label>Required assurance</label>
            <select defaultValue="IAL2">
              <option>IAL1</option>
              <option>IAL2</option>
              <option>IAL3</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-brass"
          type="button"
          onClick={() => {
            onChange({
              ...state,
              attestations: [
                {
                  id: uid('att'),
                  subjectId: 'sub_demo',
                  relyingPartyId: 'rly_fintechpay',
                  purpose: 'account_opening',
                  requiredAssurance: 'IAL2',
                  requestedAttributes: ['legalName', 'dateOfBirth'],
                  allowedAttributes: ['legalName', 'dateOfBirth'],
                  status: 'pending',
                  liabilityBearer: 'identityProvider',
                  screeningStatus: 'clear',
                },
                ...state.attestations,
              ],
            });
          }}
        >
          Submit request
        </button>
        {accepted ? (
          <AttestationCertificate a={accepted} />
        ) : (
          <div className="muted">No accepted attestation yet.</div>
        )}
      </div>
    </div>
  );
}

export function SubjectPortal({
  state,
  onChange,
}: {
  state: DemoState;
  onChange: (s: DemoState) => void;
}) {
  return (
    <div className="stack">
      <div className="panel">
        <h2>Subject consent portal</h2>
        <p className="muted">
          Approve exactly which attributes go where. No silent select-all defaults.
        </p>
      </div>
      {state.consents.map((c) => (
        <ConsentGrantCard
          key={c.id}
          purpose={c.purpose}
          attributes={c.attributeNames}
          status={c.status}
          onApprove={() => {
            onChange({
              ...state,
              consents: state.consents.map((x) =>
                x.id === c.id ? { ...x, status: 'active' } : x
              ),
              attestations: state.attestations.map((a) =>
                a.relyingPartyId === c.relyingPartyId
                  ? { ...a, consentAt: new Date().toISOString() }
                  : a
              ),
            });
          }}
          onRevoke={() => {
            onChange({
              ...state,
              consents: state.consents.map((x) =>
                x.id === c.id ? { ...x, status: 'revoked' } : x
              ),
            });
          }}
        />
      ))}
      <ConsentsView />
    </div>
  );
}

export function DirectoryOps({
  state,
  onChange,
}: {
  state: DemoState;
  onChange: (s: DemoState) => void;
}) {
  return (
    <div className="stack">
      <div className="panel">
        <h2>Directory & certification</h2>
        <p className="muted">
          Admit, suspend, certify IdPs/RPs with an auditable decision trail.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Type</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {state.members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td className="mono">{m.kind}</td>
                <td>
                  <span
                    className={`badge ${m.status === 'active' ? 'badge-valid' : 'badge-amber'}`}
                  >
                    {m.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-refuse"
                    type="button"
                    onClick={() =>
                      onChange({
                        ...state,
                        members: state.members.map((x) =>
                          x.id === m.id ? { ...x, status: 'suspended' } : x
                        ),
                      })
                    }
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DirectoryView />
    </div>
  );
}

export function SettlementOps() {
  return (
    <div className="stack">
      <div className="panel">
        <h2>Settlement & invoices</h2>
        <p className="muted">
          TUPAS-like initiation / period / volume fees as recognisable IdP fee income.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Volume</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <IaaSInvoiceLine period="2026-08" amount="$4,280.00" count={214} />
            <IaaSInvoiceLine period="2026-07" amount="$3,910.00" count={198} />
          </tbody>
        </table>
      </div>
      <SettlementView />
    </div>
  );
}

export function DisputesOps({
  state,
  onChange,
}: {
  state: DemoState;
  onChange: (s: DemoState) => void;
}) {
  return (
    <div className="stack">
      <div className="panel stack">
        <h2>Disputes & freeze</h2>
        <button
          className="btn btn-refuse"
          type="button"
          onClick={() => {
            const att = state.attestations[0];
            if (!att) return;
            onChange({
              ...state,
              attestations: state.attestations.map((a) =>
                a.id === att.id ? { ...a, status: 'disputed' } : a
              ),
              disputes: [
                {
                  id: uid('dsp'),
                  attestationId: att.id,
                  reason: 'Incorrect national identifier',
                  status: 'open',
                  freezeDependentOnboardings: true,
                },
                ...state.disputes,
              ],
            });
          }}
        >
          Open dispute on latest attestation
        </button>
        {state.disputes.map((d) => (
          <div key={d.id} className="panel" style={{ padding: 16 }}>
            <div className="mono">{d.id}</div>
            <div>{d.reason}</div>
            {d.freezeDependentOnboardings ? (
              <DisputeFreezeBanner attestationId={d.attestationId} />
            ) : null}
          </div>
        ))}
      </div>
      <DisputesView />
    </div>
  );
}

export function EvidencePacks({
  state,
  onChange,
}: {
  state: DemoState;
  onChange: (s: DemoState) => void;
}) {
  return (
    <div className="stack">
      <div className="panel stack">
        <h2>Supervisory evidence packs</h2>
        <p className="muted">
          Consent, purpose, assurance, screening freshness, and liability — no email
          archaeology.
        </p>
        <button
          className="btn btn-brass"
          type="button"
          onClick={() => {
            const att = state.attestations.find((a) => a.status === 'issued');
            const missing: string[] = [];
            if (!att) missing.push('attestation');
            else {
              if (!att.consentAt) missing.push('consent');
              if (att.screeningStatus === 'stale') missing.push('screeningFreshness');
            }
            onChange({
              ...state,
              packs: [
                {
                  id: uid('aud'),
                  attestationId: att?.id ?? 'missing',
                  status: missing.length ? 'incomplete' : 'complete',
                  missingFields: missing,
                  artefacts: [
                    'consent',
                    'purpose',
                    'assurance',
                    'screening',
                    'liability',
                  ],
                },
                ...state.packs,
              ],
            });
          }}
        >
          Generate pack
        </button>
        {state.packs.map((p) => (
          <div key={p.id} className="panel" style={{ padding: 16 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <strong className="mono">{p.id}</strong>
              <span
                className={`badge ${p.status === 'complete' ? 'badge-valid' : 'badge-refuse'}`}
              >
                {p.status}
              </span>
            </div>
            {p.status === 'incomplete' ? (
              <div className="badge badge-refuse">
                Missing: {p.missingFields.join(', ')}
              </div>
            ) : (
              <button className="btn btn-valid" type="button">
                Download
              </button>
            )}
          </div>
        ))}
      </div>
      <AuditView />
    </div>
  );
}

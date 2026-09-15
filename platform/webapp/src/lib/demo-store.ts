/** Demo in-memory store for Kyvora console workflows (API-backed later). */

export type Role =
  | 'idp'
  | 'rp'
  | 'operator'
  | 'subject'
  | 'compliance';

export type Assurance = 'IAL1' | 'IAL2' | 'IAL3';

export interface AttestationDraft {
  id: string;
  subjectId: string;
  relyingPartyId: string;
  purpose: string;
  requiredAssurance: Assurance;
  requestedAttributes: string[];
  allowedAttributes: string[];
  status: 'pending' | 'issued' | 'refused' | 'revoked' | 'disputed';
  liabilityBearer: 'identityProvider' | 'relyingParty' | 'subject';
  consentAt?: string;
  screeningStatus: 'clear' | 'stale' | 'hit';
  refuseReason?: string;
}

export interface ConsentGrant {
  id: string;
  subjectId: string;
  relyingPartyId: string;
  purpose: string;
  attributeNames: string[];
  status: 'active' | 'revoked';
}

export interface DisputeCase {
  id: string;
  attestationId: string;
  reason: string;
  status: 'open' | 'resolved';
  freezeDependentOnboardings: boolean;
}

export interface EvidencePack {
  id: string;
  attestationId: string;
  status: 'complete' | 'incomplete';
  missingFields: string[];
  artefacts: string[];
}

const STORAGE_KEY = 'kyvora.demo.v1';

export interface DemoState {
  role: Role;
  attestations: AttestationDraft[];
  consents: ConsentGrant[];
  disputes: DisputeCase[];
  packs: EvidencePack[];
  members: Array<{ id: string; name: string; kind: 'idp' | 'rp'; status: string }>;
  attributes: Array<{ name: string; assurance: Assurance; verifiedAt: string }>;
}

function seed(): DemoState {
  return {
    role: 'idp',
    members: [
      { id: 'idp_nordicbank', name: 'Nordic Retail Bank', kind: 'idp', status: 'active' },
      { id: 'rly_fintechpay', name: 'FintechPay', kind: 'rp', status: 'active' },
      { id: 'rly_insureco', name: 'InsureCo', kind: 'rp', status: 'pending' },
    ],
    attributes: [
      { name: 'legalName', assurance: 'IAL2', verifiedAt: '2026-08-01T10:00:00Z' },
      { name: 'dateOfBirth', assurance: 'IAL2', verifiedAt: '2026-08-01T10:00:00Z' },
      { name: 'nationalId', assurance: 'IAL3', verifiedAt: '2026-08-01T10:00:00Z' },
      { name: 'address', assurance: 'IAL2', verifiedAt: '2026-07-12T10:00:00Z' },
    ],
    consents: [
      {
        id: 'cns_pending_1',
        subjectId: 'sub_demo',
        relyingPartyId: 'rly_fintechpay',
        purpose: 'account_opening',
        attributeNames: ['legalName', 'dateOfBirth'],
        status: 'active',
      },
    ],
    attestations: [
      {
        id: 'att_demo_1',
        subjectId: 'sub_demo',
        relyingPartyId: 'rly_fintechpay',
        purpose: 'account_opening',
        requiredAssurance: 'IAL2',
        requestedAttributes: ['legalName', 'dateOfBirth', 'nationalId', 'marketingOptIn'],
        allowedAttributes: ['legalName', 'dateOfBirth', 'nationalId'],
        status: 'pending',
        liabilityBearer: 'identityProvider',
        screeningStatus: 'clear',
      },
    ],
    disputes: [],
    packs: [],
  };
}

export function loadState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    return { ...seed(), ...JSON.parse(raw) };
  } catch {
    return seed();
  }
}

export function saveState(state: DemoState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

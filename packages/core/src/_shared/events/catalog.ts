/**
 * Integration event type catalog — Kyvora
 */

import { z } from 'zod';

export const IntegrationEventTypes = {
  IDENTITY_API_KEY_CREATED: 'identity.api-key.created',
  IDENTITY_API_KEY_REVOKED: 'identity.api-key.revoked',
  IDENTITY_USER_CREATED: 'identity.user.created',
  IDENTITY_USER_DISABLED: 'identity.user.disabled',
  DIRECTORY_IDP_SUSPENDED: 'directory.idp.suspended',
  DIRECTORY_RP_SUSPENDED: 'directory.rp.suspended',
  DIRECTORY_MEMBER_CERTIFIED: 'directory.member.certified',
  CONSENT_GRANTED: 'consents.grant.created',
  CONSENT_REVOKED: 'consents.grant.revoked',
  ATTESTATION_ISSUED: 'attestations.attestation.issued',
  ATTESTATION_REFUSED: 'attestations.attestation.refused',
  ATTESTATION_REVOKED: 'attestations.attestation.revoked',
  SCREENING_STALE_INVALIDATED: 'screening.snapshot.invalidated',
  DISPUTE_OPENED: 'disputes.case.opened',
  DISPUTE_RESOLVED: 'disputes.case.resolved',
  SETTLEMENT_INVOICE_GENERATED: 'settlement.invoice.generated',
  AUDIT_PACK_GENERATED: 'audit.evidence-pack.generated',
} as const;

export type IntegrationEventType =
  (typeof IntegrationEventTypes)[keyof typeof IntegrationEventTypes];

export const ApiKeyCreatedPayloadSchema = z.object({
  keyId: z.string().min(1),
  tenantId: z.string().min(1),
});

export type ApiKeyCreatedPayload = z.infer<typeof ApiKeyCreatedPayloadSchema>;

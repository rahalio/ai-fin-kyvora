/**
 * Integration event type catalog — Kyvora
 */
import { z } from 'zod';
export declare const IntegrationEventTypes: {
    readonly IDENTITY_API_KEY_CREATED: "identity.api-key.created";
    readonly IDENTITY_API_KEY_REVOKED: "identity.api-key.revoked";
    readonly IDENTITY_USER_CREATED: "identity.user.created";
    readonly IDENTITY_USER_DISABLED: "identity.user.disabled";
    readonly DIRECTORY_IDP_SUSPENDED: "directory.idp.suspended";
    readonly DIRECTORY_RP_SUSPENDED: "directory.rp.suspended";
    readonly DIRECTORY_MEMBER_CERTIFIED: "directory.member.certified";
    readonly CONSENT_GRANTED: "consents.grant.created";
    readonly CONSENT_REVOKED: "consents.grant.revoked";
    readonly ATTESTATION_ISSUED: "attestations.attestation.issued";
    readonly ATTESTATION_REFUSED: "attestations.attestation.refused";
    readonly ATTESTATION_REVOKED: "attestations.attestation.revoked";
    readonly SCREENING_STALE_INVALIDATED: "screening.snapshot.invalidated";
    readonly DISPUTE_OPENED: "disputes.case.opened";
    readonly DISPUTE_RESOLVED: "disputes.case.resolved";
    readonly SETTLEMENT_INVOICE_GENERATED: "settlement.invoice.generated";
    readonly AUDIT_PACK_GENERATED: "audit.evidence-pack.generated";
};
export type IntegrationEventType = (typeof IntegrationEventTypes)[keyof typeof IntegrationEventTypes];
export declare const ApiKeyCreatedPayloadSchema: z.ZodObject<{
    keyId: z.ZodString;
    tenantId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tenantId: string;
    keyId: string;
}, {
    tenantId: string;
    keyId: string;
}>;
export type ApiKeyCreatedPayload = z.infer<typeof ApiKeyCreatedPayloadSchema>;

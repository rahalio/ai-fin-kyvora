/**
 * Attestations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */
import type { components, operations } from "../openapi/attestations.openapi.types";
export type { components, operations };
export type Attestation = components["schemas"]["Attestation"];
export type AttestationId = components["schemas"]["AttestationId"];
export type AttestationIssue = components["schemas"]["AttestationIssue"];
export type AttestationRefuse = components["schemas"]["AttestationRefuse"];
export type AttestationRevoke = components["schemas"]["AttestationRevoke"];
export type DocumentRecollectException = components["schemas"]["DocumentRecollectException"];
export type AttestationRequest = components["schemas"]["AttestationRequest"];
export type RequestAttestationRequestInput = NonNullable<operations["requestAttestation"]["requestBody"]>["content"]["application/json"];
export type IssueAttestationRequestInput = NonNullable<operations["issueAttestation"]["requestBody"]>["content"]["application/json"];
export type RefuseAttestationRequestInput = NonNullable<operations["refuseAttestation"]["requestBody"]>["content"]["application/json"];
export type RevokeAttestationRequestInput = NonNullable<operations["revokeAttestation"]["requestBody"]>["content"]["application/json"];
export type RecordDocumentRecollectExceptionRequestInput = NonNullable<operations["recordDocumentRecollectException"]["requestBody"]>["content"]["application/json"];
export type ListAttestationsParams = NonNullable<operations["listAttestations"]["parameters"]["query"]>;
export type GetAttestationParams = operations["getAttestation"]["parameters"]["path"];
export type IssueAttestationParams = operations["issueAttestation"]["parameters"]["path"];
export type RefuseAttestationParams = operations["refuseAttestation"]["parameters"]["path"];
export type RevokeAttestationParams = operations["revokeAttestation"]["parameters"]["path"];
export type RecordDocumentRecollectExceptionParams = operations["recordDocumentRecollectException"]["parameters"]["path"];
export type ListAttestationsResponse = operations["listAttestations"]["responses"]["200"]["content"]["application/json"];
export type RequestAttestationResponse = operations["requestAttestation"]["responses"]["201"]["content"]["application/json"];
export type GetAttestationResponse = operations["getAttestation"]["responses"]["200"]["content"]["application/json"];
export type IssueAttestationResponse = operations["issueAttestation"]["responses"]["200"]["content"]["application/json"];
export type RefuseAttestationResponse = operations["refuseAttestation"]["responses"]["200"]["content"]["application/json"];
export type RevokeAttestationResponse = operations["revokeAttestation"]["responses"]["200"]["content"]["application/json"];
export type RecordDocumentRecollectExceptionResponse = operations["recordDocumentRecollectException"]["responses"]["200"]["content"]["application/json"];

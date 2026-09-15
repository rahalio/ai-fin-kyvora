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

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Attestation = components["schemas"]["Attestation"];
export type AttestationId = components["schemas"]["AttestationId"];
export type AttestationIssue = components["schemas"]["AttestationIssue"];
export type AttestationRefuse = components["schemas"]["AttestationRefuse"];
export type AttestationRevoke = components["schemas"]["AttestationRevoke"];
export type DocumentRecollectException = components["schemas"]["DocumentRecollectException"];
export type AttestationRequest = components["schemas"]["AttestationRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RequestAttestationRequestInput = NonNullable<operations["requestAttestation"]["requestBody"]>["content"]["application/json"];
export type IssueAttestationRequestInput = NonNullable<operations["issueAttestation"]["requestBody"]>["content"]["application/json"];
export type RefuseAttestationRequestInput = NonNullable<operations["refuseAttestation"]["requestBody"]>["content"]["application/json"];
export type RevokeAttestationRequestInput = NonNullable<operations["revokeAttestation"]["requestBody"]>["content"]["application/json"];
export type RecordDocumentRecollectExceptionRequestInput = NonNullable<operations["recordDocumentRecollectException"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAttestationsParams = NonNullable<operations["listAttestations"]["parameters"]["query"]>;
export type GetAttestationParams = operations["getAttestation"]["parameters"]["path"];
export type IssueAttestationParams = operations["issueAttestation"]["parameters"]["path"];
export type RefuseAttestationParams = operations["refuseAttestation"]["parameters"]["path"];
export type RevokeAttestationParams = operations["revokeAttestation"]["parameters"]["path"];
export type RecordDocumentRecollectExceptionParams = operations["recordDocumentRecollectException"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAttestationsResponse = operations["listAttestations"]["responses"]["200"]["content"]["application/json"];
export type RequestAttestationResponse = operations["requestAttestation"]["responses"]["201"]["content"]["application/json"];
export type GetAttestationResponse = operations["getAttestation"]["responses"]["200"]["content"]["application/json"];
export type IssueAttestationResponse = operations["issueAttestation"]["responses"]["200"]["content"]["application/json"];
export type RefuseAttestationResponse = operations["refuseAttestation"]["responses"]["200"]["content"]["application/json"];
export type RevokeAttestationResponse = operations["revokeAttestation"]["responses"]["200"]["content"]["application/json"];
export type RecordDocumentRecollectExceptionResponse = operations["recordDocumentRecollectException"]["responses"]["200"]["content"]["application/json"];



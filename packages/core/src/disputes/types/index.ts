/**
 * Disputes Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/disputes.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DisputeCase = components["schemas"]["DisputeCase"];
export type DisputeCaseCreate = components["schemas"]["DisputeCaseCreate"];
export type DisputeCaseResolve = components["schemas"]["DisputeCaseResolve"];
export type DisputeId = components["schemas"]["DisputeId"];
export type Dispute = operations["listDisputeCases"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenDisputeCaseRequestInput = NonNullable<operations["openDisputeCase"]["requestBody"]>["content"]["application/json"];
export type ResolveDisputeCaseRequestInput = NonNullable<operations["resolveDisputeCase"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDisputeCasesParams = NonNullable<operations["listDisputeCases"]["parameters"]["query"]>;
export type GetDisputeCaseParams = operations["getDisputeCase"]["parameters"]["path"];
export type ResolveDisputeCaseParams = operations["resolveDisputeCase"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDisputeCasesResponse = operations["listDisputeCases"]["responses"]["200"]["content"]["application/json"];
export type OpenDisputeCaseResponse = operations["openDisputeCase"]["responses"]["201"]["content"]["application/json"];
export type GetDisputeCaseResponse = operations["getDisputeCase"]["responses"]["200"]["content"]["application/json"];
export type ResolveDisputeCaseResponse = operations["resolveDisputeCase"]["responses"]["200"]["content"]["application/json"];



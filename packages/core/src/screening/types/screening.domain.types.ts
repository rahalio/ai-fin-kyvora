/**
 * Screening Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/screening.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ScreeningInvalidation = components["schemas"]["ScreeningInvalidation"];
export type ScreeningSnapshot = components["schemas"]["ScreeningSnapshot"];
export type ScreeningSnapshotCreate = components["schemas"]["ScreeningSnapshotCreate"];
export type SnapshotId = components["schemas"]["SnapshotId"];
export type Snapshot = operations["listScreeningSnapshots"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RefreshScreeningSnapshotRequestInput = NonNullable<operations["refreshScreeningSnapshot"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListScreeningSnapshotsParams = NonNullable<operations["listScreeningSnapshots"]["parameters"]["query"]>;
export type GetScreeningSnapshotParams = operations["getScreeningSnapshot"]["parameters"]["path"];
export type InvalidateStaleScreeningDependentsParams = operations["invalidateStaleScreeningDependents"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListScreeningSnapshotsResponse = operations["listScreeningSnapshots"]["responses"]["200"]["content"]["application/json"];
export type RefreshScreeningSnapshotResponse = operations["refreshScreeningSnapshot"]["responses"]["201"]["content"]["application/json"];
export type GetScreeningSnapshotResponse = operations["getScreeningSnapshot"]["responses"]["200"]["content"]["application/json"];
export type InvalidateStaleScreeningDependentsResponse = operations["invalidateStaleScreeningDependents"]["responses"]["200"]["content"]["application/json"];



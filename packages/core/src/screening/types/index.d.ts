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
export type { components, operations };
export type ScreeningInvalidation = components["schemas"]["ScreeningInvalidation"];
export type ScreeningSnapshot = components["schemas"]["ScreeningSnapshot"];
export type ScreeningSnapshotCreate = components["schemas"]["ScreeningSnapshotCreate"];
export type SnapshotId = components["schemas"]["SnapshotId"];
export type Snapshot = operations["listScreeningSnapshots"]["responses"]["200"]["content"]["application/json"]["data"];
export type RefreshScreeningSnapshotRequestInput = NonNullable<operations["refreshScreeningSnapshot"]["requestBody"]>["content"]["application/json"];
export type ListScreeningSnapshotsParams = NonNullable<operations["listScreeningSnapshots"]["parameters"]["query"]>;
export type GetScreeningSnapshotParams = operations["getScreeningSnapshot"]["parameters"]["path"];
export type InvalidateStaleScreeningDependentsParams = operations["invalidateStaleScreeningDependents"]["parameters"]["path"];
export type ListScreeningSnapshotsResponse = operations["listScreeningSnapshots"]["responses"]["200"]["content"]["application/json"];
export type RefreshScreeningSnapshotResponse = operations["refreshScreeningSnapshot"]["responses"]["201"]["content"]["application/json"];
export type GetScreeningSnapshotResponse = operations["getScreeningSnapshot"]["responses"]["200"]["content"]["application/json"];
export type InvalidateStaleScreeningDependentsResponse = operations["invalidateStaleScreeningDependents"]["responses"]["200"]["content"]["application/json"];

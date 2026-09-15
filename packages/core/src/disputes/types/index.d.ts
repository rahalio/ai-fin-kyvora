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
export type { components, operations };
export type DisputeCase = components["schemas"]["DisputeCase"];
export type DisputeCaseCreate = components["schemas"]["DisputeCaseCreate"];
export type DisputeCaseResolve = components["schemas"]["DisputeCaseResolve"];
export type DisputeId = components["schemas"]["DisputeId"];
export type Dispute = operations["listDisputeCases"]["responses"]["200"]["content"]["application/json"]["data"];
export type OpenDisputeCaseRequestInput = NonNullable<operations["openDisputeCase"]["requestBody"]>["content"]["application/json"];
export type ResolveDisputeCaseRequestInput = NonNullable<operations["resolveDisputeCase"]["requestBody"]>["content"]["application/json"];
export type ListDisputeCasesParams = NonNullable<operations["listDisputeCases"]["parameters"]["query"]>;
export type GetDisputeCaseParams = operations["getDisputeCase"]["parameters"]["path"];
export type ResolveDisputeCaseParams = operations["resolveDisputeCase"]["parameters"]["path"];
export type ListDisputeCasesResponse = operations["listDisputeCases"]["responses"]["200"]["content"]["application/json"];
export type OpenDisputeCaseResponse = operations["openDisputeCase"]["responses"]["201"]["content"]["application/json"];
export type GetDisputeCaseResponse = operations["getDisputeCase"]["responses"]["200"]["content"]["application/json"];
export type ResolveDisputeCaseResponse = operations["resolveDisputeCase"]["responses"]["200"]["content"]["application/json"];

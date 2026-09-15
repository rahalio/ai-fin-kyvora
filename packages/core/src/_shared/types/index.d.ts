/**
 * Shared types for DDD Codegen Starter Investor Portal API.
 * Aligned with domains/common/common.yaml; per-domain types live in domain modules.
 */
import type { components } from "./_master.types.js";
export type { components, operations } from "./_master.types.js";
export type { OrgId } from "../repositories/_base-repository.js";
export type Currency = components["schemas"]["Currency"];
export type DataEnvelope = components["schemas"]["DataEnvelope"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type PagedDataEnvelope = components["schemas"]["PagedDataEnvelope"];
export type Pagination = components["schemas"]["Pagination"];
export type PageInfo = components["schemas"]["PageInfo"];

/**
 * Consents Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */
import type { components, operations } from "../openapi/consents.openapi.types";
export type { components, operations };
export type ConsentGrant = components["schemas"]["ConsentGrant"];
export type ConsentGrantCreate = components["schemas"]["ConsentGrantCreate"];
export type ConsentId = components["schemas"]["ConsentId"];
export type Consent = operations["listConsentGrants"]["responses"]["200"]["content"]["application/json"]["data"];
export type CreateConsentGrantRequestInput = NonNullable<operations["createConsentGrant"]["requestBody"]>["content"]["application/json"];
export type ListConsentGrantsParams = NonNullable<operations["listConsentGrants"]["parameters"]["query"]>;
export type GetConsentGrantParams = operations["getConsentGrant"]["parameters"]["path"];
export type RevokeConsentGrantParams = operations["revokeConsentGrant"]["parameters"]["path"];
export type ListConsentGrantsResponse = operations["listConsentGrants"]["responses"]["200"]["content"]["application/json"];
export type CreateConsentGrantResponse = operations["createConsentGrant"]["responses"]["201"]["content"]["application/json"];
export type GetConsentGrantResponse = operations["getConsentGrant"]["responses"]["200"]["content"]["application/json"];
export type RevokeConsentGrantResponse = operations["revokeConsentGrant"]["responses"]["200"]["content"]["application/json"];

/**
 * Audit Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */
import type { components, operations } from "../openapi/audit.openapi.types";
export type { components, operations };
export type EvidencePack = components["schemas"]["EvidencePack"];
export type EvidencePackDownload = components["schemas"]["EvidencePackDownload"];
export type EvidencePackGenerate = components["schemas"]["EvidencePackGenerate"];
export type PackId = components["schemas"]["PackId"];
export type GenerateEvidencePackRequestInput = NonNullable<operations["generateEvidencePack"]["requestBody"]>["content"]["application/json"];
export type ListEvidencePacksParams = NonNullable<operations["listEvidencePacks"]["parameters"]["query"]>;
export type GetEvidencePackParams = operations["getEvidencePack"]["parameters"]["path"];
export type DownloadEvidencePackParams = operations["downloadEvidencePack"]["parameters"]["path"];
export type ListEvidencePacksResponse = operations["listEvidencePacks"]["responses"]["200"]["content"]["application/json"];
export type GenerateEvidencePackResponse = operations["generateEvidencePack"]["responses"]["201"]["content"]["application/json"];
export type GetEvidencePackResponse = operations["getEvidencePack"]["responses"]["200"]["content"]["application/json"];
export type DownloadEvidencePackResponse = operations["downloadEvidencePack"]["responses"]["200"]["content"]["application/json"];

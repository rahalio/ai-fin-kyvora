/**
 * Subjects Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */
import type { components, operations } from "../openapi/subjects.openapi.types";
export type { components, operations };
export type AttributeId = components["schemas"]["AttributeId"];
export type AttributeRecord = components["schemas"]["AttributeRecord"];
export type AttributeRecordCreate = components["schemas"]["AttributeRecordCreate"];
export type CycleId = components["schemas"]["CycleId"];
export type IdentitySubject = components["schemas"]["IdentitySubject"];
export type IdentitySubjectCreate = components["schemas"]["IdentitySubjectCreate"];
export type IdentitySubjectUpdate = components["schemas"]["IdentitySubjectUpdate"];
export type LegalEntityLink = components["schemas"]["LegalEntityLink"];
export type LegalEntityLinkCreate = components["schemas"]["LegalEntityLinkCreate"];
export type LinkId = components["schemas"]["LinkId"];
export type RefreshCycle = components["schemas"]["RefreshCycle"];
export type RefreshCycleComplete = components["schemas"]["RefreshCycleComplete"];
export type RefreshCycleCreate = components["schemas"]["RefreshCycleCreate"];
export type SubjectId = components["schemas"]["SubjectId"];
export type Subject = operations["listSubjects"]["responses"]["200"]["content"]["application/json"]["data"];
export type Attribute = operations["listSubjectAttributes"]["responses"]["200"]["content"]["application/json"]["data"];
export type CreateSubjectRequestInput = NonNullable<operations["createSubject"]["requestBody"]>["content"]["application/json"];
export type UpdateSubjectRequestInput = NonNullable<operations["updateSubject"]["requestBody"]>["content"]["application/json"];
export type UpdateSubjectRequest = UpdateSubjectRequestInput;
export type RegisterSubjectAttributeRequestInput = NonNullable<operations["registerSubjectAttribute"]["requestBody"]>["content"]["application/json"];
export type CreateLegalEntityLinkRequestInput = NonNullable<operations["createLegalEntityLink"]["requestBody"]>["content"]["application/json"];
export type CreateRefreshCycleRequestInput = NonNullable<operations["createRefreshCycle"]["requestBody"]>["content"]["application/json"];
export type CompleteRefreshCycleRequestInput = NonNullable<operations["completeRefreshCycle"]["requestBody"]>["content"]["application/json"];
export type ListSubjectsParams = NonNullable<operations["listSubjects"]["parameters"]["query"]>;
export type GetSubjectParams = operations["getSubject"]["parameters"]["path"];
export type UpdateSubjectParams = operations["updateSubject"]["parameters"]["path"];
export type ListSubjectAttributesParams = NonNullable<operations["listSubjectAttributes"]["parameters"]["query"]>;
export type RegisterSubjectAttributeParams = operations["registerSubjectAttribute"]["parameters"]["path"];
export type ListLegalEntityLinksParams = operations["listLegalEntityLinks"]["parameters"]["path"];
export type CreateLegalEntityLinkParams = operations["createLegalEntityLink"]["parameters"]["path"];
export type UnlinkLegalEntityParams = operations["unlinkLegalEntity"]["parameters"]["path"];
export type ListRefreshCyclesParams = NonNullable<operations["listRefreshCycles"]["parameters"]["query"]>;
export type CompleteRefreshCycleParams = operations["completeRefreshCycle"]["parameters"]["path"];
export type ListSubjectsResponse = operations["listSubjects"]["responses"]["200"]["content"]["application/json"];
export type CreateSubjectResponse = operations["createSubject"]["responses"]["201"]["content"]["application/json"];
export type GetSubjectResponse = operations["getSubject"]["responses"]["200"]["content"]["application/json"];
export type UpdateSubjectResponse = operations["updateSubject"]["responses"]["200"]["content"]["application/json"];
export type ListSubjectAttributesResponse = operations["listSubjectAttributes"]["responses"]["200"]["content"]["application/json"];
export type RegisterSubjectAttributeResponse = operations["registerSubjectAttribute"]["responses"]["201"]["content"]["application/json"];
export type ListLegalEntityLinksResponse = operations["listLegalEntityLinks"]["responses"]["200"]["content"]["application/json"];
export type CreateLegalEntityLinkResponse = operations["createLegalEntityLink"]["responses"]["201"]["content"]["application/json"];
export type ListRefreshCyclesResponse = operations["listRefreshCycles"]["responses"]["200"]["content"]["application/json"];
export type CreateRefreshCycleResponse = operations["createRefreshCycle"]["responses"]["201"]["content"]["application/json"];
export type CompleteRefreshCycleResponse = operations["completeRefreshCycle"]["responses"]["200"]["content"]["application/json"];

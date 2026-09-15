/**
 * Directory Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */
import type { components, operations } from "../openapi/directory.openapi.types";
export type { components, operations };
export type DecisionId = components["schemas"]["DecisionId"];
export type IdentityProvider = components["schemas"]["IdentityProvider"];
export type IdentityProviderCreate = components["schemas"]["IdentityProviderCreate"];
export type IdpId = components["schemas"]["IdpId"];
export type MembershipDecision = components["schemas"]["MembershipDecision"];
export type MembershipDecisionCreate = components["schemas"]["MembershipDecisionCreate"];
export type RelyingParty = components["schemas"]["RelyingParty"];
export type RelyingPartyCreate = components["schemas"]["RelyingPartyCreate"];
export type RpId = components["schemas"]["RpId"];
export type RegisterIdentityProviderRequestInput = NonNullable<operations["registerIdentityProvider"]["requestBody"]>["content"]["application/json"];
export type CertifyIdentityProviderRequestInput = NonNullable<operations["certifyIdentityProvider"]["requestBody"]>["content"]["application/json"];
export type SuspendIdentityProviderRequestInput = NonNullable<operations["suspendIdentityProvider"]["requestBody"]>["content"]["application/json"];
export type RegisterRelyingPartyRequestInput = NonNullable<operations["registerRelyingParty"]["requestBody"]>["content"]["application/json"];
export type CertifyRelyingPartyRequestInput = NonNullable<operations["certifyRelyingParty"]["requestBody"]>["content"]["application/json"];
export type SuspendRelyingPartyRequestInput = NonNullable<operations["suspendRelyingParty"]["requestBody"]>["content"]["application/json"];
export type ListIdentityProvidersParams = NonNullable<operations["listIdentityProviders"]["parameters"]["query"]>;
export type GetIdentityProviderParams = operations["getIdentityProvider"]["parameters"]["path"];
export type CertifyIdentityProviderParams = operations["certifyIdentityProvider"]["parameters"]["path"];
export type SuspendIdentityProviderParams = operations["suspendIdentityProvider"]["parameters"]["path"];
export type ListRelyingPartiesParams = NonNullable<operations["listRelyingParties"]["parameters"]["query"]>;
export type GetRelyingPartyParams = operations["getRelyingParty"]["parameters"]["path"];
export type CertifyRelyingPartyParams = operations["certifyRelyingParty"]["parameters"]["path"];
export type SuspendRelyingPartyParams = operations["suspendRelyingParty"]["parameters"]["path"];
export type ListMembershipDecisionsParams = NonNullable<operations["listMembershipDecisions"]["parameters"]["query"]>;
export type ListIdentityProvidersResponse = operations["listIdentityProviders"]["responses"]["200"]["content"]["application/json"];
export type RegisterIdentityProviderResponse = operations["registerIdentityProvider"]["responses"]["201"]["content"]["application/json"];
export type GetIdentityProviderResponse = operations["getIdentityProvider"]["responses"]["200"]["content"]["application/json"];
export type CertifyIdentityProviderResponse = operations["certifyIdentityProvider"]["responses"]["200"]["content"]["application/json"];
export type SuspendIdentityProviderResponse = operations["suspendIdentityProvider"]["responses"]["202"]["content"]["application/json"];
export type ListRelyingPartiesResponse = operations["listRelyingParties"]["responses"]["200"]["content"]["application/json"];
export type RegisterRelyingPartyResponse = operations["registerRelyingParty"]["responses"]["201"]["content"]["application/json"];
export type GetRelyingPartyResponse = operations["getRelyingParty"]["responses"]["200"]["content"]["application/json"];
export type CertifyRelyingPartyResponse = operations["certifyRelyingParty"]["responses"]["200"]["content"]["application/json"];
export type SuspendRelyingPartyResponse = operations["suspendRelyingParty"]["responses"]["202"]["content"]["application/json"];
export type ListMembershipDecisionsResponse = operations["listMembershipDecisions"]["responses"]["200"]["content"]["application/json"];

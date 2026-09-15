/**
 * Tenant isolation helpers (application-level multi-tenancy).
 */
export declare const SYSTEM_TENANT_ID = "system";
/** @deprecated Use SYSTEM_TENANT_ID */
export declare const SYSTEM_ORG_ID = "system";
/**
 * Validate tenant ID — prefers tnt_ ULID; also accepts plain sandbox ids.
 */
export declare function isValidTenantId(tenantId: string): boolean;
/** @deprecated Use isValidTenantId */
export declare function isValidOrgId(orgId: string): boolean;

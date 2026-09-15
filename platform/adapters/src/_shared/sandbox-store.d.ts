/**
 * Process-wide in-memory store for local / sandbox identity flows.
 * Extend this file when you add product domains to a consumer repo.
 */
export declare function sandboxId(prefix: string): string;
export declare function nowIso(): string;
export declare function responseMeta(correlationId?: string): {
    meta: {
        correlationId: string | undefined;
        generatedAt: string;
    };
};
export interface SandboxApiKey {
    keyId: string;
    tenantId: string;
    name: string;
    prefix: string;
    secret: string;
    status: 'active' | 'revoked';
    scopes: string[];
    createdAt: string;
    expiresAt?: string;
    lastUsedAt?: string;
}
export interface SandboxUser {
    userId: string;
    tenantId: string;
    email: string;
    displayName: string;
    role: 'admin' | 'analyst' | 'viewer' | 'ops';
    status: 'active' | 'disabled';
    password: string;
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;
    disabledAt?: string;
}
export declare const apiKeysById: Map<string, SandboxApiKey>;
export declare const apiKeysByTenant: Map<string, Set<string>>;
export declare const usersById: Map<string, SandboxUser>;
export declare const usersByTenant: Map<string, Set<string>>;
export declare function toPublicUser(user: SandboxUser): {
    userId: string;
    email: string;
    displayName: string;
    role: "admin" | "analyst" | "viewer" | "ops";
    status: "active" | "disabled";
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string | undefined;
    disabledAt: string | undefined;
};
export declare function listUsersForTenant(tenantId: string): SandboxUser[];
export declare function generateApiKeySecret(prefix?: string): string;
export interface SandboxTenantProfile {
    tenantId: string;
    displayNameEn: string;
    displayNameAr?: string;
    createdAt: string;
    updatedAt: string;
}
export declare const tenantProfilesById: Map<string, SandboxTenantProfile>;
export declare function getOrCreateTenantProfile(tenantId: string): SandboxTenantProfile;

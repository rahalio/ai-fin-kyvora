/**
 * Process-wide in-memory store for local / sandbox identity flows.
 * Extend this file when you add product domains to a consumer repo.
 */
import { randomBytes } from 'node:crypto';
import { ulid } from 'ulid';
export function sandboxId(prefix) {
    return `${prefix}_${ulid().toLowerCase()}`;
}
export function nowIso() {
    return new Date().toISOString();
}
export function responseMeta(correlationId) {
    return {
        meta: {
            correlationId,
            generatedAt: nowIso(),
        },
    };
}
export const apiKeysById = new Map();
export const apiKeysByTenant = new Map();
export const usersById = new Map();
export const usersByTenant = new Map();
export function toPublicUser(user) {
    return {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        disabledAt: user.disabledAt,
    };
}
function seedDemoUsers(tenantId) {
    if ((usersByTenant.get(tenantId)?.size ?? 0) > 0)
        return;
    const now = nowIso();
    const seeds = [
        {
            tenantId,
            email: 'admin@demo.local',
            displayName: 'Demo Admin',
            role: 'admin',
            status: 'active',
            password: 'sandbox-admin-8',
            createdAt: now,
            updatedAt: now,
        },
        {
            tenantId,
            email: 'analyst@demo.local',
            displayName: 'Demo Analyst',
            role: 'analyst',
            status: 'active',
            password: 'sandbox-analyst-8',
            createdAt: now,
            updatedAt: now,
        },
    ];
    const ids = new Set();
    for (const seed of seeds) {
        const userId = sandboxId('usr');
        const user = { ...seed, userId };
        usersById.set(userId, user);
        ids.add(userId);
    }
    usersByTenant.set(tenantId, ids);
}
export function listUsersForTenant(tenantId) {
    seedDemoUsers(tenantId);
    const ids = usersByTenant.get(tenantId) ?? new Set();
    return [...ids]
        .map((id) => usersById.get(id))
        .filter((u) => Boolean(u));
}
export function generateApiKeySecret(prefix = 'kyvora_demo') {
    return `${prefix}_${randomBytes(24).toString('hex')}`;
}
export const tenantProfilesById = new Map();
export function getOrCreateTenantProfile(tenantId) {
    const existing = tenantProfilesById.get(tenantId);
    if (existing)
        return existing;
    const now = nowIso();
    const profile = {
        tenantId,
        displayNameEn: 'Kyvora Demo Tenant',
        displayNameAr: 'مستأجر كايڤورا التجريبي',
        createdAt: now,
        updatedAt: now,
    };
    tenantProfilesById.set(tenantId, profile);
    return profile;
}

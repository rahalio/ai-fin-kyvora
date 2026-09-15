/**
 * UserRepository — in-memory sandbox operator users.
 */
import { listUsersForTenant, nowIso, responseMeta, sandboxId, toPublicUser, usersById, usersByTenant, } from '../_shared/sandbox-store.js';
export class UserRepositoryDdb {
    _dynamoClient;
    constructor(_dynamoClient) {
        this._dynamoClient = _dynamoClient;
    }
    async listTenantUsers(input) {
        const raw = input;
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        const items = listUsersForTenant(tenantId).map(toPublicUser);
        return {
            data: { items },
            ...responseMeta(correlationId),
        };
    }
    async createTenantUser(input) {
        const raw = input;
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        const email = String(raw.email ?? '').toLowerCase();
        const displayName = String(raw.displayName ?? '');
        const role = String(raw.role ?? 'viewer');
        const password = String(raw.password ?? '');
        const existing = listUsersForTenant(tenantId).find((u) => u.email.toLowerCase() === email);
        if (existing) {
            const err = new Error('User with this email already exists');
            err.statusCode = 409;
            throw err;
        }
        const now = nowIso();
        const userId = sandboxId('usr');
        const user = {
            userId,
            tenantId,
            email,
            displayName,
            role: role === 'admin' ||
                role === 'analyst' ||
                role === 'viewer' ||
                role === 'ops'
                ? role
                : 'viewer',
            status: 'active',
            password,
            createdAt: now,
            updatedAt: now,
        };
        usersById.set(userId, user);
        const ids = usersByTenant.get(tenantId) ?? new Set();
        ids.add(userId);
        usersByTenant.set(tenantId, ids);
        return {
            data: toPublicUser(user),
            ...responseMeta(correlationId),
        };
    }
    async getTenantUser(input) {
        const raw = input;
        const userId = String(raw.userId ?? '');
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        listUsersForTenant(tenantId);
        const user = usersById.get(userId);
        if (!user || user.tenantId !== tenantId) {
            return null;
        }
        return {
            data: toPublicUser(user),
            ...responseMeta(correlationId),
        };
    }
    async updateTenantUser(input) {
        const raw = input;
        const userId = String(raw.userId ?? '');
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        listUsersForTenant(tenantId);
        const user = usersById.get(userId);
        if (!user || user.tenantId !== tenantId) {
            return null;
        }
        if (raw.displayName !== undefined) {
            user.displayName = String(raw.displayName);
        }
        if (raw.role === 'admin' ||
            raw.role === 'analyst' ||
            raw.role === 'viewer' ||
            raw.role === 'ops') {
            user.role = raw.role;
        }
        if (raw.password !== undefined) {
            user.password = String(raw.password);
        }
        user.updatedAt = nowIso();
        usersById.set(userId, user);
        return {
            data: toPublicUser(user),
            ...responseMeta(correlationId),
        };
    }
}

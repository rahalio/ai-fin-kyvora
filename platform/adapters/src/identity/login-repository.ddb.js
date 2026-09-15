/**
 * LoginRepository — sandbox auth + session me.
 */
import { generateAccessToken, generateRefreshToken, } from '@kyvora/services/_shared';
import { getOrCreateTenantProfile, listUsersForTenant, nowIso, responseMeta, usersById, } from '../_shared/sandbox-store.js';
/** refreshToken → userId for sandbox refresh without jwt dep in adapters */
export const refreshSessions = new Map();
function resolveTenantId(raw) {
    const orgId = String(raw.orgId ?? 'tnt_demo');
    return !orgId || orgId === 'system' ? 'tnt_demo' : orgId;
}
function toSessionOperator(user) {
    return {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
    };
}
function tenantSummary(tenantId) {
    const profile = getOrCreateTenantProfile(tenantId);
    return {
        tenantId,
        displayNameEn: profile.displayNameEn,
        displayNameAr: profile.displayNameAr,
    };
}
function syntheticApiKeyOperator() {
    return {
        userId: 'usr_api_key_demo',
        email: 'api-key@demo.local',
        displayName: 'Demo API key',
        role: 'admin',
    };
}
function issueTokens(user, tenantId, correlationId) {
    const claims = {
        userId: user.userId,
        email: user.email,
        role: user.role,
        tenantId,
    };
    const accessToken = generateAccessToken(claims);
    const refreshToken = generateRefreshToken(claims);
    refreshSessions.set(refreshToken, user.userId);
    return {
        data: {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: 900,
            operator: toSessionOperator(user),
        },
        ...responseMeta(correlationId),
    };
}
export class LoginRepositoryDdb {
    _dynamoClient;
    constructor(_dynamoClient) {
        this._dynamoClient = _dynamoClient;
    }
    async operatorLogin(input) {
        const raw = input;
        const tenantId = resolveTenantId(raw);
        const correlationId = String(raw.correlationId ?? '');
        const email = String(raw.email ?? '')
            .trim()
            .toLowerCase();
        const password = String(raw.password ?? '');
        const user = listUsersForTenant(tenantId).find((u) => u.email.toLowerCase() === email);
        if (!user || user.password !== password || user.status !== 'active') {
            const err = new Error('Invalid email or password');
            err.statusCode = 401;
            throw err;
        }
        user.lastLoginAt = nowIso();
        usersById.set(user.userId, user);
        return issueTokens(user, tenantId, correlationId);
    }
    async getOperatorMe(input) {
        const raw = input;
        const tenantId = resolveTenantId(raw);
        const correlationId = String(raw.correlationId ?? '');
        const userId = raw.userId ? String(raw.userId) : '';
        if (!userId || userId === 'usr_api_key_demo') {
            return {
                data: {
                    operator: syntheticApiKeyOperator(),
                    tenant: tenantSummary(tenantId),
                },
                ...responseMeta(correlationId),
            };
        }
        listUsersForTenant(tenantId);
        const user = usersById.get(userId);
        if (!user || user.tenantId !== tenantId) {
            return null;
        }
        return {
            data: {
                operator: toSessionOperator(user),
                tenant: tenantSummary(tenantId),
            },
            ...responseMeta(correlationId),
        };
    }
    async updateOperatorMe(input) {
        const raw = input;
        const tenantId = resolveTenantId(raw);
        const correlationId = String(raw.correlationId ?? '');
        const userId = raw.userId ? String(raw.userId) : '';
        const displayName = String(raw.displayName ?? '').trim();
        if (!userId || userId === 'usr_api_key_demo') {
            const op = syntheticApiKeyOperator();
            return {
                data: {
                    operator: { ...op, displayName: displayName || op.displayName },
                    tenant: tenantSummary(tenantId),
                },
                ...responseMeta(correlationId),
            };
        }
        listUsersForTenant(tenantId);
        const user = usersById.get(userId);
        if (!user || user.tenantId !== tenantId) {
            return null;
        }
        user.displayName = displayName;
        user.updatedAt = nowIso();
        usersById.set(user.userId, user);
        return {
            data: {
                operator: toSessionOperator(user),
                tenant: tenantSummary(tenantId),
            },
            ...responseMeta(correlationId),
        };
    }
}

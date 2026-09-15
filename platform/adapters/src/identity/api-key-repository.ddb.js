/**
 * ApiKeyRepository — in-memory sandbox implementation.
 */
import { seedApiKey } from '../_shared/in-memory-api-key-lookup.js';
import { apiKeysById, apiKeysByTenant, generateApiKeySecret, nowIso, responseMeta, sandboxId, } from '../_shared/sandbox-store.js';
function toPublicKey(key) {
    return {
        keyId: key.keyId,
        name: key.name,
        prefix: key.prefix,
        status: key.status,
        scopes: key.scopes,
        createdAt: key.createdAt,
        lastUsedAt: key.lastUsedAt,
        expiresAt: key.expiresAt,
    };
}
export class ApiKeyRepositoryDdb {
    _dynamoClient;
    constructor(_dynamoClient) {
        this._dynamoClient = _dynamoClient;
    }
    async listTenantApiKeys(input) {
        const raw = input;
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        const ids = apiKeysByTenant.get(tenantId) ?? new Set();
        const items = [...ids]
            .map((id) => apiKeysById.get(id))
            .filter((k) => Boolean(k))
            .map(toPublicKey);
        return {
            data: { items },
            ...responseMeta(correlationId),
        };
    }
    async createTenantApiKey(input) {
        const raw = input;
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        const keyId = String(raw.id ?? sandboxId('key'));
        const name = String(raw.name ?? 'sandbox-key');
        const scopes = raw.scopes ?? [
            'packs:read',
            'packs:write',
            'ingest:write',
        ];
        const secret = generateApiKeySecret('zzk_demo');
        const prefix = secret.slice(0, 16);
        const createdAt = nowIso();
        const record = {
            keyId,
            tenantId,
            name,
            prefix,
            secret,
            status: 'active',
            scopes,
            createdAt,
            expiresAt: raw.expiresAt ? String(raw.expiresAt) : undefined,
        };
        apiKeysById.set(keyId, record);
        const tenantKeys = apiKeysByTenant.get(tenantId) ?? new Set();
        tenantKeys.add(keyId);
        apiKeysByTenant.set(tenantId, tenantKeys);
        seedApiKey(secret, {
            keyId,
            tenantId,
            scopes,
            expiresAt: record.expiresAt,
        });
        return {
            data: {
                ...toPublicKey(record),
                secret,
            },
            ...responseMeta(correlationId),
        };
    }
    async getTenantApiKey(input) {
        const raw = input;
        const keyId = String(raw.keyId ?? '');
        const correlationId = String(raw.correlationId ?? '');
        const key = apiKeysById.get(keyId);
        if (!key) {
            return null;
        }
        return {
            data: toPublicKey(key),
            ...responseMeta(correlationId),
        };
    }
    async revokeTenantApiKey(input) {
        const raw = input;
        const keyId = String(raw.keyId ?? '');
        const key = apiKeysById.get(keyId);
        if (!key) {
            return null;
        }
        key.status = 'revoked';
        apiKeysById.set(keyId, key);
        seedApiKey(key.secret, {
            keyId: key.keyId,
            tenantId: key.tenantId,
            scopes: key.scopes,
            expiresAt: key.expiresAt,
            revoked: true,
        });
        return {};
    }
}

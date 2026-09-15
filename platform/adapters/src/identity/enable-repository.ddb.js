/**
 * EnableRepository — sandbox re-enable operator user.
 */
import { listUsersForTenant, nowIso, responseMeta, toPublicUser, usersById, } from '../_shared/sandbox-store.js';
export class EnableRepositoryDdb {
    _dynamoClient;
    constructor(_dynamoClient) {
        this._dynamoClient = _dynamoClient;
    }
    async enableTenantUser(input) {
        const raw = input;
        const userId = String(raw.userId ?? '');
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        listUsersForTenant(tenantId);
        const user = usersById.get(userId);
        if (!user || user.tenantId !== tenantId) {
            return null;
        }
        user.status = 'active';
        user.disabledAt = undefined;
        user.updatedAt = nowIso();
        usersById.set(userId, user);
        return {
            data: toPublicUser(user),
            ...responseMeta(correlationId),
        };
    }
}

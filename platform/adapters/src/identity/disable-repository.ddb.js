/**
 * DisableRepository — sandbox disable operator user.
 */
import { listUsersForTenant, nowIso, responseMeta, toPublicUser, usersById, } from '../_shared/sandbox-store.js';
export class DisableRepositoryDdb {
    _dynamoClient;
    constructor(_dynamoClient) {
        this._dynamoClient = _dynamoClient;
    }
    async disableTenantUser(input) {
        const raw = input;
        const userId = String(raw.userId ?? '');
        const tenantId = String(raw.orgId ?? 'tnt_demo');
        const correlationId = String(raw.correlationId ?? '');
        listUsersForTenant(tenantId);
        const user = usersById.get(userId);
        if (!user || user.tenantId !== tenantId) {
            return null;
        }
        user.status = 'disabled';
        user.disabledAt = nowIso();
        user.updatedAt = user.disabledAt;
        usersById.set(userId, user);
        return {
            data: toPublicUser(user),
            ...responseMeta(correlationId),
        };
    }
}

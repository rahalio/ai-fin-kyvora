/**
 * RefreshRepository — sandbox refresh via session map.
 */
import { generateAccessToken, generateRefreshToken, } from '@kyvora/services/_shared';
import { listUsersForTenant, responseMeta, usersById, } from '../_shared/sandbox-store.js';
import { refreshSessions } from './login-repository.ddb.js';
export class RefreshRepositoryDdb {
    _dynamoClient;
    constructor(_dynamoClient) {
        this._dynamoClient = _dynamoClient;
    }
    async operatorRefresh(input) {
        const raw = input;
        const correlationId = String(raw.correlationId ?? '');
        const refreshToken = String(raw.refreshToken ?? '');
        const userId = refreshSessions.get(refreshToken);
        if (!userId) {
            const err = new Error('Invalid refresh token');
            err.statusCode = 401;
            throw err;
        }
        const user = usersById.get(userId);
        if (!user) {
            const err = new Error('Invalid refresh token');
            err.statusCode = 401;
            throw err;
        }
        listUsersForTenant(user.tenantId);
        const claims = {
            userId: user.userId,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        };
        const accessToken = generateAccessToken(claims);
        const nextRefresh = generateRefreshToken(claims);
        refreshSessions.delete(refreshToken);
        refreshSessions.set(nextRefresh, user.userId);
        return {
            data: {
                accessToken,
                refreshToken: nextRefresh,
                tokenType: 'Bearer',
                expiresIn: 900,
                operator: {
                    userId: user.userId,
                    email: user.email,
                    displayName: user.displayName,
                    role: user.role,
                },
            },
            ...responseMeta(correlationId),
        };
    }
}

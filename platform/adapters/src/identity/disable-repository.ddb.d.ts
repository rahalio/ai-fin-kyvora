/**
 * DisableRepository — sandbox disable operator user.
 */
import type { DisableRepository } from '@kyvora/services/identity';
export declare class DisableRepositoryDdb implements DisableRepository {
    private readonly _dynamoClient;
    constructor(_dynamoClient: unknown);
    disableTenantUser(input: Parameters<DisableRepository['disableTenantUser']>[0]): Promise<Awaited<ReturnType<DisableRepository['disableTenantUser']>>>;
}

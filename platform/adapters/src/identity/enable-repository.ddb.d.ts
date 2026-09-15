/**
 * EnableRepository — sandbox re-enable operator user.
 */
import type { EnableRepository } from '@kyvora/services/identity';
export declare class EnableRepositoryDdb implements EnableRepository {
    private readonly _dynamoClient;
    constructor(_dynamoClient: unknown);
    enableTenantUser(input: Parameters<EnableRepository['enableTenantUser']>[0]): Promise<Awaited<ReturnType<EnableRepository['enableTenantUser']>>>;
}

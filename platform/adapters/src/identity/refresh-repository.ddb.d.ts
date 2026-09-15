/**
 * RefreshRepository — sandbox refresh via session map.
 */
import type { RefreshRepository } from '@kyvora/services/identity';
export declare class RefreshRepositoryDdb implements RefreshRepository {
    private readonly _dynamoClient;
    constructor(_dynamoClient: unknown);
    operatorRefresh(input: Parameters<RefreshRepository['operatorRefresh']>[0]): Promise<Awaited<ReturnType<RefreshRepository['operatorRefresh']>>>;
}

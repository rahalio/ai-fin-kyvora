/**
 * RefreshCycleRepository - DynamoDB Implementation (sandbox stub)
 */
import type { RefreshCycleRepository } from '@kyvora/services/subjects';
export declare class RefreshCycleRepositoryDdb implements RefreshCycleRepository {
    private readonly dynamoClient;
    constructor(dynamoClient: any);
    listRefreshCycles(input: Parameters<RefreshCycleRepository['listRefreshCycles']>[0]): Promise<Awaited<ReturnType<RefreshCycleRepository['listRefreshCycles']>>>;
    createRefreshCycle(input: Parameters<RefreshCycleRepository['createRefreshCycle']>[0]): Promise<Awaited<ReturnType<RefreshCycleRepository['createRefreshCycle']>>>;
}
/** @deprecated alias kept for older DI wiring */
export declare class CycleRepositoryDdb extends RefreshCycleRepositoryDdb {
}

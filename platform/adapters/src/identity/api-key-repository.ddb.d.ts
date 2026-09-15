/**
 * ApiKeyRepository — in-memory sandbox implementation.
 */
import type { ApiKeyRepository } from '@kyvora/services/identity';
export declare class ApiKeyRepositoryDdb implements ApiKeyRepository {
    private readonly _dynamoClient;
    constructor(_dynamoClient: unknown);
    listTenantApiKeys(input: Parameters<ApiKeyRepository['listTenantApiKeys']>[0]): Promise<Awaited<ReturnType<ApiKeyRepository['listTenantApiKeys']>>>;
    createTenantApiKey(input: Parameters<ApiKeyRepository['createTenantApiKey']>[0]): Promise<Awaited<ReturnType<ApiKeyRepository['createTenantApiKey']>>>;
    getTenantApiKey(input: Parameters<ApiKeyRepository['getTenantApiKey']>[0]): Promise<Awaited<ReturnType<ApiKeyRepository['getTenantApiKey']>>>;
    revokeTenantApiKey(input: Parameters<ApiKeyRepository['revokeTenantApiKey']>[0]): Promise<Awaited<ReturnType<ApiKeyRepository['revokeTenantApiKey']>>>;
}

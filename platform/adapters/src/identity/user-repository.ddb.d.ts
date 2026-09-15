/**
 * UserRepository — in-memory sandbox operator users.
 */
import type { UserRepository } from '@kyvora/services/identity';
export declare class UserRepositoryDdb implements UserRepository {
    private readonly _dynamoClient;
    constructor(_dynamoClient: unknown);
    listTenantUsers(input: Parameters<UserRepository['listTenantUsers']>[0]): Promise<Awaited<ReturnType<UserRepository['listTenantUsers']>>>;
    createTenantUser(input: Parameters<UserRepository['createTenantUser']>[0]): Promise<Awaited<ReturnType<UserRepository['createTenantUser']>>>;
    getTenantUser(input: Parameters<UserRepository['getTenantUser']>[0]): Promise<Awaited<ReturnType<UserRepository['getTenantUser']>>>;
    updateTenantUser(input: Parameters<UserRepository['updateTenantUser']>[0]): Promise<Awaited<ReturnType<UserRepository['updateTenantUser']>>>;
}

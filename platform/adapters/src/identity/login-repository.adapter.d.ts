/**
 * LoginRepositoryAdapter — hand-extended for me endpoints.
 */
import type { LoginRepository } from '@kyvora/services/identity';
import type { AdapterDynamoDBClient } from '../_shared/dynamodb-client-types.js';
export declare class LoginRepositoryAdapter implements LoginRepository {
    private readonly dynamoClient;
    private readonly ddb;
    constructor(dynamoClient: AdapterDynamoDBClient);
    operatorLogin(input: Parameters<LoginRepository['operatorLogin']>[0]): Promise<Awaited<ReturnType<LoginRepository['operatorLogin']>>>;
    getOperatorMe(input: Parameters<LoginRepository['getOperatorMe']>[0]): Promise<Awaited<ReturnType<LoginRepository['getOperatorMe']>>>;
    updateOperatorMe(input: Parameters<LoginRepository['updateOperatorMe']>[0]): Promise<Awaited<ReturnType<LoginRepository['updateOperatorMe']>>>;
}

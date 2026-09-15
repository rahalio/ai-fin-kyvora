/**
 * LoginRepository — sandbox auth + session me.
 */
import type { LoginRepository } from '@kyvora/services/identity';
/** refreshToken → userId for sandbox refresh without jwt dep in adapters */
export declare const refreshSessions: Map<string, string>;
export declare class LoginRepositoryDdb implements LoginRepository {
    private readonly _dynamoClient;
    constructor(_dynamoClient: unknown);
    operatorLogin(input: Parameters<LoginRepository['operatorLogin']>[0]): Promise<Awaited<ReturnType<LoginRepository['operatorLogin']>>>;
    getOperatorMe(input: Parameters<LoginRepository['getOperatorMe']>[0]): Promise<Awaited<ReturnType<LoginRepository['getOperatorMe']>>>;
    updateOperatorMe(input: Parameters<LoginRepository['updateOperatorMe']>[0]): Promise<Awaited<ReturnType<LoginRepository['updateOperatorMe']>>>;
}

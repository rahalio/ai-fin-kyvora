/**
 * LoginRepositoryAdapter — hand-extended for me endpoints.
 */
import { LoginRepositoryDdb } from './login-repository.ddb.js';
export class LoginRepositoryAdapter {
    dynamoClient;
    ddb;
    constructor(dynamoClient) {
        this.dynamoClient = dynamoClient;
        this.ddb = new LoginRepositoryDdb(this.dynamoClient);
    }
    async operatorLogin(input) {
        return await this.ddb.operatorLogin(input);
    }
    async getOperatorMe(input) {
        return await this.ddb.getOperatorMe(input);
    }
    async updateOperatorMe(input) {
        return await this.ddb.updateOperatorMe(input);
    }
}

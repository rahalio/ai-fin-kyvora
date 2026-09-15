/** ExecuteUpdateOperatorMe — hand-maintained. */
import { NotFoundError, ValidationError } from '../errors';
export class ExecuteUpdateOperatorMe {
    context;
    idGenerator;
    login;
    constructor(context, idGenerator, login) {
        this.context = context;
        this.idGenerator = idGenerator;
        this.login = login;
    }
    async execute(input) {
        const correlationId = this.idGenerator.idnId();
        if (!input?.displayName?.trim()) {
            throw new ValidationError('displayName is required');
        }
        const result = await this.login.updateOperatorMe({
            ...input,
            orgId: this.context.getOrgId(),
            userId: this.context.getUserId(),
            correlationId,
        });
        if (!result)
            throw new NotFoundError('Session not found');
        return result;
    }
}

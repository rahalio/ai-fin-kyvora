/** ExecuteGetOperatorMe — hand-maintained. */
import { NotFoundError } from '../errors';
export class ExecuteGetOperatorMe {
    context;
    idGenerator;
    login;
    constructor(context, idGenerator, login) {
        this.context = context;
        this.idGenerator = idGenerator;
        this.login = login;
    }
    async execute(input = {}) {
        const correlationId = this.idGenerator.idnId();
        const result = await this.login.getOperatorMe({
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

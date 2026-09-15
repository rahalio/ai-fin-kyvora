/** ExecuteGetOperatorMe — hand-maintained. */
import type { GetOperatorMeInput, GetOperatorMeOutput } from '../dto/login.dto';
import type { ExecutionContextService, IdGeneratorService } from '@kyvora/services/_shared/index.js';
import type { LoginRepository } from '../ports/index.js';
export declare class ExecuteGetOperatorMe {
    private readonly context;
    private readonly idGenerator;
    private readonly login;
    constructor(context: ExecutionContextService, idGenerator: IdGeneratorService, login: LoginRepository);
    execute(input?: GetOperatorMeInput): Promise<GetOperatorMeOutput>;
}

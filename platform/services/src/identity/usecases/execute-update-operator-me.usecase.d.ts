/** ExecuteUpdateOperatorMe — hand-maintained. */
import type { UpdateOperatorMeInput, UpdateOperatorMeOutput } from '../dto/login.dto';
import type { ExecutionContextService, IdGeneratorService } from '@kyvora/services/_shared/index.js';
import type { LoginRepository } from '../ports/index.js';
export declare class ExecuteUpdateOperatorMe {
    private readonly context;
    private readonly idGenerator;
    private readonly login;
    constructor(context: ExecutionContextService, idGenerator: IdGeneratorService, login: LoginRepository);
    execute(input: UpdateOperatorMeInput): Promise<UpdateOperatorMeOutput>;
}

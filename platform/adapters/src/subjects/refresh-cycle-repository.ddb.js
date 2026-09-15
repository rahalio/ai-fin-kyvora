/**
 * RefreshCycleRepository - DynamoDB Implementation (sandbox stub)
 */
export class RefreshCycleRepositoryDdb {
    dynamoClient;
    constructor(dynamoClient) {
        this.dynamoClient = dynamoClient;
    }
    async listRefreshCycles(input) {
        void input;
        return {
            data: { items: [] },
            meta: { generatedAt: new Date().toISOString() },
        };
    }
    async createRefreshCycle(input) {
        const now = new Date().toISOString();
        const raw = input;
        return {
            data: {
                cycleId: raw.id ?? raw.cycleId,
                subjectId: raw.subjectId,
                dueAt: raw.dueAt,
                status: 'scheduled',
                changeSignals: raw.changeSignals ?? [],
                createdAt: now,
                updatedAt: now,
            },
            meta: { generatedAt: now, correlationId: raw.correlationId },
        };
    }
}
/** @deprecated alias kept for older DI wiring */
export class CycleRepositoryDdb extends RefreshCycleRepositoryDdb {
}

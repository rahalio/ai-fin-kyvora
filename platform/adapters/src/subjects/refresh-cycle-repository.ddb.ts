/**
 * RefreshCycleRepository - DynamoDB Implementation (sandbox stub)
 */

import type { RefreshCycleRepository } from '@kyvora/services/subjects';

export class RefreshCycleRepositoryDdb implements RefreshCycleRepository {
  constructor(private readonly dynamoClient: any) {}

  async listRefreshCycles(
    input: Parameters<RefreshCycleRepository['listRefreshCycles']>[0]
  ): Promise<Awaited<ReturnType<RefreshCycleRepository['listRefreshCycles']>>> {
    void input;
    return {
      data: { items: [] },
      meta: { generatedAt: new Date().toISOString() },
    } as any;
  }

  async createRefreshCycle(
    input: Parameters<RefreshCycleRepository['createRefreshCycle']>[0]
  ): Promise<Awaited<ReturnType<RefreshCycleRepository['createRefreshCycle']>>> {
    const now = new Date().toISOString();
    const raw = input as Record<string, unknown>;
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
    } as any;
  }
}

/** @deprecated alias kept for older DI wiring */
export class CycleRepositoryDdb extends RefreshCycleRepositoryDdb {}

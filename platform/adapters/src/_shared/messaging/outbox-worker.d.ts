/**
 * Outbox drain worker — polls pending events and dispatches via the in-process bus.
 *
 * Safe to run in-process alongside the API or as a compose sidecar entrypoint.
 */
import type { InProcessIntegrationEventBus } from "./in-process-integration-event-bus.js";
import type { DynamoDbOutboxStore } from "./dynamodb-outbox-store.js";
export type OutboxWorkerOptions = {
    intervalMs?: number;
    batchSize?: number;
    onError?: (error: unknown) => void;
};
export type OutboxWorkerHandle = {
    stop(): void;
    /** Run a single drain cycle (useful in tests). */
    tick(): Promise<void>;
};
export declare function startOutboxWorker(outbox: DynamoDbOutboxStore, bus: InProcessIntegrationEventBus, options?: OutboxWorkerOptions): OutboxWorkerHandle;

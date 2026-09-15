/**
 * Outbox-backed publisher: durable write, then local async dispatch + mark processed.
 *
 * If the process dies after putPending and before markProcessed, the outbox worker
 * retries (at-least-once). Handlers should use eventId idempotency when needed.
 */
import type { PublishIntegrationEventInput } from "@kyvora/core/_shared/events";
import type { IntegrationEventPublisher } from "@kyvora/services/_shared";
import type { DynamoDbOutboxStore } from "./dynamodb-outbox-store.js";
import type { InProcessIntegrationEventBus } from "./in-process-integration-event-bus.js";
export declare class OutboxIntegrationEventPublisher implements IntegrationEventPublisher {
    private readonly outbox;
    private readonly bus;
    private readonly options;
    constructor(outbox: DynamoDbOutboxStore, bus: InProcessIntegrationEventBus, options?: {
        dispatchLocally?: boolean;
    });
    publish(event: PublishIntegrationEventInput | PublishIntegrationEventInput[]): Promise<void>;
}

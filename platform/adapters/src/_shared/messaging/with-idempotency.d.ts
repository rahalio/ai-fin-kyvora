/**
 * Idempotent handler wrapper — skips events already marked processed.
 */
import type { IntegrationEventHandler } from "@kyvora/services/_shared";
import type { DynamoDbProcessedEventStore } from "./processed-event-store.js";
export declare function withIdempotency(handler: IntegrationEventHandler, store: DynamoDbProcessedEventStore): IntegrationEventHandler;

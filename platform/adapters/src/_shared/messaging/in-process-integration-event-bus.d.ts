/**
 * In-process async integration event bus.
 *
 * Implements publisher + handler registry for the monolith. Handlers run
 * off the request path via queueMicrotask; failures are logged and do not
 * reject the publish promise.
 */
import type { IntegrationEventEnvelope } from "@kyvora/core/_shared/events";
import type { IntegrationEventPublisher } from "@kyvora/services/_shared";
import type { EventHandlerRegistry, IntegrationEventHandler } from "@kyvora/services/_shared";
export type InProcessIntegrationEventBus = IntegrationEventPublisher & EventHandlerRegistry & {
    /** Dispatch a fully-formed envelope to matching handlers (async). */
    dispatch(event: IntegrationEventEnvelope): Promise<void>;
};
export declare function createInProcessIntegrationEventBus(options?: {
    onHandlerError?: (error: unknown, event: IntegrationEventEnvelope, handler: IntegrationEventHandler) => void;
}): InProcessIntegrationEventBus;

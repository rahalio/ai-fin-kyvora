/**
 * In-process async integration event bus.
 *
 * Implements publisher + handler registry for the monolith. Handlers run
 * off the request path via queueMicrotask; failures are logged and do not
 * reject the publish promise.
 */
import { ulid } from "ulid";
function matches(handler, eventType) {
    const types = Array.isArray(handler.eventType)
        ? handler.eventType
        : [handler.eventType];
    return types.some((t) => t === "*" || t === eventType);
}
function toEnvelope(input) {
    return {
        eventId: `evt_${ulid().toLowerCase()}`,
        eventType: input.eventType,
        sourceDomain: input.sourceDomain,
        schemaVersion: input.schemaVersion,
        occurredAt: new Date().toISOString(),
        correlationId: input.correlationId,
        tenantId: input.tenantId,
        accountId: input.accountId,
        aggregateId: input.aggregateId,
        payload: input.payload,
    };
}
export function createInProcessIntegrationEventBus(options = {}) {
    const handlers = [];
    const onHandlerError = options.onHandlerError ??
        ((error, event, handler) => {
            console.error("[integration-event-bus] handler failed", {
                eventType: event.eventType,
                eventId: event.eventId,
                handlerEventType: handler.eventType,
            }, error);
        });
    async function runHandlers(event) {
        const matched = handlers.filter((h) => matches(h, event.eventType));
        await Promise.all(matched.map(async (handler) => {
            try {
                await handler.handle(event);
            }
            catch (error) {
                onHandlerError(error, event, handler);
            }
        }));
    }
    function enqueue(event) {
        queueMicrotask(() => {
            void runHandlers(event);
        });
    }
    return {
        register(handler) {
            handlers.push(handler);
        },
        listHandlers() {
            return handlers;
        },
        async publish(event) {
            const inputs = Array.isArray(event) ? event : [event];
            for (const input of inputs) {
                enqueue(toEnvelope(input));
            }
        },
        /** Await matching handlers (used by outbox worker / durable path). */
        async dispatch(event) {
            await runHandlers(event);
        },
    };
}

/**
 * Outbox-backed publisher: durable write, then local async dispatch + mark processed.
 *
 * If the process dies after putPending and before markProcessed, the outbox worker
 * retries (at-least-once). Handlers should use eventId idempotency when needed.
 */
import { ulid } from "ulid";
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
export class OutboxIntegrationEventPublisher {
    outbox;
    bus;
    options;
    constructor(outbox, bus, options = {
        dispatchLocally: true,
    }) {
        this.outbox = outbox;
        this.bus = bus;
        this.options = options;
    }
    async publish(event) {
        const inputs = Array.isArray(event) ? event : [event];
        for (const input of inputs) {
            const envelope = toEnvelope(input);
            await this.outbox.putPending(envelope);
            if (this.options.dispatchLocally !== false) {
                // Do not await handlers — publish must return after durable handoff.
                void (async () => {
                    try {
                        await this.bus.dispatch(envelope);
                        await this.outbox.markProcessed(envelope);
                    }
                    catch (error) {
                        await this.outbox.markFailed(envelope, error);
                    }
                })();
            }
        }
    }
}

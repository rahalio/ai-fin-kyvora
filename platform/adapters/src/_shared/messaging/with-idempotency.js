/**
 * Idempotent handler wrapper — skips events already marked processed.
 */
export function withIdempotency(handler, store) {
    return {
        eventType: handler.eventType,
        async handle(event) {
            if (await store.hasProcessed(event.eventId)) {
                return;
            }
            await handler.handle(event);
            try {
                await store.markProcessed(event.eventId, event.eventType);
            }
            catch {
                // Concurrent consumer may have raced the condition — treat as success.
            }
        },
    };
}

/**
 * IntegrationEventPublisher — application port for async cross-domain events.
 *
 * Implementations live in adapters (in-process bus, DynamoDB outbox, …).
 * Use cases publish after successful writes; they must not await consumers.
 */
export {};

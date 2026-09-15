/**
 * DynamoDB outbox store for durable integration events.
 *
 * Item shape uses status + GSI-friendly keys on the core table:
 *   PK = OUTBOX#{orgId}
 *   SK = EVENT#{occurredAt}#{eventId}
 *   GSI2 PK = OUTBOX#STATUS#{status}, SK = EVENT#{occurredAt}#{eventId}
 */
import type { IntegrationEventEnvelope } from "@kyvora/core/_shared/events";
import type { AdapterDynamoDBClient } from "../dynamodb-client-types.js";
export type OutboxStatus = "pending" | "processing" | "processed" | "failed";
export type OutboxItem = IntegrationEventEnvelope & {
    status: OutboxStatus;
    attempts: number;
    lastError?: string;
    availableAt?: string;
};
export declare class DynamoDbOutboxStore {
    private readonly dynamoClient;
    private readonly tableName;
    constructor(dynamoClient: AdapterDynamoDBClient);
    private buildKeys;
    putPending(event: IntegrationEventEnvelope): Promise<void>;
    listPending(limit?: number): Promise<OutboxItem[]>;
    markProcessed(event: IntegrationEventEnvelope): Promise<void>;
    markFailed(event: IntegrationEventEnvelope, error: unknown): Promise<void>;
    private toOutboxItem;
}

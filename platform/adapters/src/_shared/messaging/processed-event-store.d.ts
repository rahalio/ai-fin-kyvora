/**
 * Idempotency store for processed integration events (consumer side).
 */
import type { AdapterDynamoDBClient } from "../dynamodb-client-types.js";
export declare class DynamoDbProcessedEventStore {
    private readonly dynamoClient;
    private readonly tableName;
    constructor(dynamoClient: AdapterDynamoDBClient);
    hasProcessed(eventId: string): Promise<boolean>;
    markProcessed(eventId: string, eventType: string): Promise<void>;
}

/**
 * Idempotency store for processed integration events (consumer side).
 */
import { getCoreTableName } from "../dynamodb-utils.js";
export class DynamoDbProcessedEventStore {
    dynamoClient;
    tableName;
    constructor(dynamoClient) {
        this.dynamoClient = dynamoClient;
        this.tableName = getCoreTableName();
    }
    async hasProcessed(eventId) {
        const result = await this.dynamoClient.get({
            TableName: this.tableName,
            Key: {
                PK: `PROCESSED_EVENT#${eventId}`,
                SK: "META",
            },
        });
        return Boolean(result.Item);
    }
    async markProcessed(eventId, eventType) {
        await this.dynamoClient.put({
            TableName: this.tableName,
            Item: {
                PK: `PROCESSED_EVENT#${eventId}`,
                SK: "META",
                entityType: "PROCESSED_EVENT",
                eventId,
                eventType,
                processedAt: new Date().toISOString(),
            },
            ConditionExpression: "attribute_not_exists(PK)",
        });
    }
}

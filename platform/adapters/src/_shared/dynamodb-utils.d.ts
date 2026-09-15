/**
 * DynamoDB Utilities
 *
 * Table name resolvers and shared helpers for DynamoDB repository adapters.
 * Entity-specific key building is done via each adapter's private buildPK/buildSK.
 */
export { sanitizeItem } from "./dynamodb-key-helpers.js";
/**
 * Get the core DynamoDB table name from environment variables
 *
 * @returns The core table name (e.g., "ddd-codegen-starter-core-dev")
 * @throws Error if TABLE_NAME or DYNAMODB_CORE_TABLE_NAME environment variable is not set
 */
export declare function getCoreTableName(): string;
/**
 * Get the base DynamoDB table name from environment variables
 *
 * @returns The base table name (e.g., "ddd-codegen-starter-base-dev")
 * @throws Error if BASE_TABLE_NAME or DYNAMODB_BASE_TABLE_NAME environment variable is not set
 */
export declare function getBaseTableName(): string;
/**
 * Get the analytics DynamoDB table name from environment variables
 *
 * @returns The analytics table name (e.g., "ddd-codegen-starter-analytics-dev")
 * @throws Error if ANALYTICS_TABLE_NAME or DYNAMODB_ANALYTICS_TABLE_NAME environment variable is not set
 */
export declare function getAnalyticsTableName(): string;
/**
 * Get the realtime DynamoDB table name from environment variables
 *
 * @returns The realtime table name (e.g., "ddd-codegen-starter-app-realtime-dev")
 * @throws Error if REALTIME_TABLE_NAME or DYNAMODB_REALTIME_TABLE_NAME environment variable is not set
 */
export declare function getRealtimeTableName(): string;

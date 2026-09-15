/**
 * In-memory ApiKeyLookup for local/skeleton use.
 * Replace with DynamoDB adapter in production.
 */
import type { ApiKeyLookup, ApiKeyRecord } from '@kyvora/services/_shared';
/** Seed a known key for local testing (hash → record). */
export declare function seedApiKey(rawApiKey: string, record: ApiKeyRecord): void;
export declare class InMemoryApiKeyLookup implements ApiKeyLookup {
    lookup(rawApiKey: string): Promise<ApiKeyRecord | null>;
}
export declare const inMemoryApiKeyLookup: InMemoryApiKeyLookup;

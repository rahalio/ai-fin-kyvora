/**
 * In-memory idempotency store for skeleton / local VPC pilots.
 */
import type { IdempotencyRecord, IdempotencyStore } from '@kyvora/services/_shared';
export declare class InMemoryIdempotencyStore implements IdempotencyStore {
    get(tenantId: string, key: string): Promise<IdempotencyRecord | null>;
    put(record: IdempotencyRecord): Promise<void>;
}
export declare const inMemoryIdempotencyStore: InMemoryIdempotencyStore;

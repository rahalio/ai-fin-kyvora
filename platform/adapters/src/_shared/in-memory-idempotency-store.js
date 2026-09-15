/**
 * In-memory idempotency store for skeleton / local VPC pilots.
 */
const store = new Map();
function composite(tenantId, key) {
    return `${tenantId}::${key}`;
}
export class InMemoryIdempotencyStore {
    async get(tenantId, key) {
        return store.get(composite(tenantId, key)) ?? null;
    }
    async put(record) {
        store.set(composite(record.tenantId, record.key), record);
    }
}
export const inMemoryIdempotencyStore = new InMemoryIdempotencyStore();

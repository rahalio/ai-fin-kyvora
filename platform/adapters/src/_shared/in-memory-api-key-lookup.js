/**
 * In-memory ApiKeyLookup for local/skeleton use.
 * Replace with DynamoDB adapter in production.
 */
import { createHash } from 'node:crypto';
const store = new Map();
function hashKey(raw) {
    return createHash('sha256').update(raw).digest('hex');
}
/** Seed a known key for local testing (hash → record). */
export function seedApiKey(rawApiKey, record) {
    store.set(hashKey(rawApiKey), { ...record });
}
export class InMemoryApiKeyLookup {
    async lookup(rawApiKey) {
        const record = store.get(hashKey(rawApiKey));
        if (!record)
            return null;
        if (record.revoked)
            return null;
        if (record.expiresAt && Date.parse(record.expiresAt) < Date.now()) {
            return null;
        }
        return record;
    }
}
export const inMemoryApiKeyLookup = new InMemoryApiKeyLookup();

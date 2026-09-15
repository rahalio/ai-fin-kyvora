/**
 * DynamoDB Key Helpers
 *
 * Shared infrastructure utilities for DynamoDB adapters.
 * Entity-specific key building lives in each adapter (private buildPK/buildSK).
 *
 * ⚠️  These are infrastructure utilities specific to DynamoDB.
 */
/**
 * Normalize a DynamoDB item to domain format (pk/sk casing and strip infra fields).
 *
 * @param item - The DynamoDB item (may have PK/SK or pk/sk)
 * @returns Domain-shaped object with normalized keys
 */
export declare function sanitizeItem(item: Record<string, unknown> | null | undefined): Record<string, unknown>;
/**
 * Optional generic: build a partition key for org-scoped entities.
 * Adapters typically use their own private buildPK(input) instead.
 *
 * @param orgId - The organization ID
 * @returns Partition key in format: `ORG#${orgId}`
 */
export declare function buildPK(orgId: string): string;
/**
 * Optional generic: build a sort key with entity type and id.
 * Adapters typically use their own private buildSK(input) instead.
 *
 * @param entityType - The entity type or token (e.g. "DOCUMENT_TEMPLATE")
 * @param id - The entity ID
 * @param status - Optional status prefix (default "ACTIVE")
 * @returns Sort key in format: `${status}#${entityType}#${id}` or `${entityType}#${id}`
 */
export declare function buildSK(entityType: string, id: string, status?: string): string;

/**
 * Query parameter parsing helpers for Fastify routes
 */
/**
 * Parse query parameters from Fastify request
 * Handles optional parameters and type conversion
 *
 * @param query - Query object from Fastify request
 * @param defaults - Default values for optional parameters
 * @returns Parsed query parameters object
 */
export declare function parseQueryParams<T extends Record<string, any>>(query: any, defaults?: Partial<T>): T;

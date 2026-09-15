/**
 * ExecutionContext Service — AsyncLocalStorage tenant + optional user.
 */
import type { ExecutionContextService } from '../ports/execution-context.service.port.js';
interface ExecutionContextData {
    tenantId: string;
    userId?: string;
}
declare class ExecutionContextServiceImpl implements ExecutionContextService {
    private readonly asyncLocalStorage;
    run<T>(context: ExecutionContextData, fn: () => T): T;
    runAsync<T>(context: ExecutionContextData, fn: () => Promise<T>): Promise<T>;
    getTenantId(): string;
    getUserId(): string | undefined;
    setTenantId(tenantId: string): void;
    setUserId(userId: string): void;
    getOrgId(): string;
    setOrgId(orgId: string): void;
}
export declare const executionContextService: ExecutionContextServiceImpl;
export {};

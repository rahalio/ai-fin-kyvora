/**
 * ExecutionContext Service — AsyncLocalStorage tenant + optional user.
 */
import { AsyncLocalStorage } from 'async_hooks';
class ExecutionContextServiceImpl {
    asyncLocalStorage = new AsyncLocalStorage();
    run(context, fn) {
        return this.asyncLocalStorage.run(context, fn);
    }
    async runAsync(context, fn) {
        return this.asyncLocalStorage.run(context, fn);
    }
    getTenantId() {
        const context = this.asyncLocalStorage.getStore();
        if (!context?.tenantId) {
            throw new Error('tenantId not set in execution context. Ensure context is set before calling usecase.');
        }
        return context.tenantId;
    }
    getUserId() {
        return this.asyncLocalStorage.getStore()?.userId;
    }
    setTenantId(tenantId) {
        const context = this.asyncLocalStorage.getStore();
        if (!context) {
            throw new Error('Cannot set tenantId: execution context not initialized. Use run() or runAsync() first.');
        }
        context.tenantId = tenantId;
    }
    setUserId(userId) {
        const context = this.asyncLocalStorage.getStore();
        if (!context) {
            throw new Error('Cannot set userId: execution context not initialized. Use run() or runAsync() first.');
        }
        context.userId = userId;
    }
    getOrgId() {
        return this.getTenantId();
    }
    setOrgId(orgId) {
        this.setTenantId(orgId);
    }
}
export const executionContextService = new ExecutionContextServiceImpl();

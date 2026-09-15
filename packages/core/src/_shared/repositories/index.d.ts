/**
 * Shared Repository Contracts (barrel)
 *
 * Centralizes exports for repository contracts and multi-tenant helpers.
 */
export type { OrgId, PaginationParams, PaginatedResult, RepositoryList, RepositoryGet, RepositoryCreate, ReadRepository, CreateReadRepository, UpdateReadRepository, DeleteReadRepository, CreateUpdateReadRepository, CreateDeleteReadRepository, UpdateDeleteReadRepository, CrudRepository, SingleTenantReadRepository, SingleTenantCreateReadRepository, SingleTenantUpdateReadRepository, SingleTenantDeleteReadRepository, SingleTenantCreateUpdateReadRepository, SingleTenantCreateDeleteReadRepository, SingleTenantUpdateDeleteReadRepository, SingleTenantCrudRepository, BulkOperationRepository, QueryableRepository, SearchableRepository, ActionRepository, } from "./_base-repository.js";
export type { UserContext, SingleTenantRepository, PaginatedResponse, } from "./base-repository-convenience.js";

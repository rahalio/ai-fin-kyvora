/**
 * Settlement Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */
import type { components, operations } from "../openapi/settlement.openapi.types";
export type { components, operations };
export type FeeSchedule = components["schemas"]["FeeSchedule"];
export type FeeScheduleUpsert = components["schemas"]["FeeScheduleUpsert"];
export type InvoiceId = components["schemas"]["InvoiceId"];
export type ScheduleId = components["schemas"]["ScheduleId"];
export type SettlementInvoice = components["schemas"]["SettlementInvoice"];
export type SettlementInvoiceExport = components["schemas"]["SettlementInvoiceExport"];
export type SettlementInvoiceGenerate = components["schemas"]["SettlementInvoiceGenerate"];
export type Invoice = operations["listSettlementInvoices"]["responses"]["200"]["content"]["application/json"]["data"];
export type Export = operations["exportSettlementInvoice"]["responses"]["200"]["content"]["application/json"]["data"];
export type UpsertFeeScheduleRequestInput = NonNullable<operations["upsertFeeSchedule"]["requestBody"]>["content"]["application/json"];
export type GenerateSettlementInvoiceRequestInput = NonNullable<operations["generateSettlementInvoice"]["requestBody"]>["content"]["application/json"];
export type ListFeeSchedulesParams = NonNullable<operations["listFeeSchedules"]["parameters"]["query"]>;
export type GetFeeScheduleParams = operations["getFeeSchedule"]["parameters"]["path"];
export type ListSettlementInvoicesParams = NonNullable<operations["listSettlementInvoices"]["parameters"]["query"]>;
export type GetSettlementInvoiceParams = operations["getSettlementInvoice"]["parameters"]["path"];
export type ExportSettlementInvoiceParams = operations["exportSettlementInvoice"]["parameters"]["path"];
export type ListFeeSchedulesResponse = operations["listFeeSchedules"]["responses"]["200"]["content"]["application/json"];
export type UpsertFeeScheduleResponse = operations["upsertFeeSchedule"]["responses"]["201"]["content"]["application/json"];
export type GetFeeScheduleResponse = operations["getFeeSchedule"]["responses"]["200"]["content"]["application/json"];
export type ListSettlementInvoicesResponse = operations["listSettlementInvoices"]["responses"]["200"]["content"]["application/json"];
export type GenerateSettlementInvoiceResponse = operations["generateSettlementInvoice"]["responses"]["201"]["content"]["application/json"];
export type GetSettlementInvoiceResponse = operations["getSettlementInvoice"]["responses"]["200"]["content"]["application/json"];
export type ExportSettlementInvoiceResponse = operations["exportSettlementInvoice"]["responses"]["200"]["content"]["application/json"];

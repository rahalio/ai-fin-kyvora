/**
 * Integration event envelope — shared contract for cross-domain async messaging.
 */
import { z } from 'zod';
export declare const INTEGRATION_EVENT_SOURCE_DOMAINS: readonly ["identity"];
export type IntegrationEventSourceDomain = (typeof INTEGRATION_EVENT_SOURCE_DOMAINS)[number];
export declare const IntegrationEventEnvelopeSchema: z.ZodObject<{
    eventId: z.ZodString;
    eventType: z.ZodString;
    sourceDomain: z.ZodEnum<["identity"]>;
    schemaVersion: z.ZodNumber;
    occurredAt: z.ZodUnion<[z.ZodString, z.ZodString]>;
    correlationId: z.ZodString;
    tenantId: z.ZodString;
    accountId: z.ZodOptional<z.ZodString>;
    aggregateId: z.ZodOptional<z.ZodString>;
    payload: z.ZodUnknown;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    eventType: string;
    sourceDomain: "identity";
    schemaVersion: number;
    occurredAt: string;
    correlationId: string;
    tenantId: string;
    accountId?: string | undefined;
    aggregateId?: string | undefined;
    payload?: unknown;
}, {
    eventId: string;
    eventType: string;
    sourceDomain: "identity";
    schemaVersion: number;
    occurredAt: string;
    correlationId: string;
    tenantId: string;
    accountId?: string | undefined;
    aggregateId?: string | undefined;
    payload?: unknown;
}>;
export type IntegrationEventEnvelope = z.infer<typeof IntegrationEventEnvelopeSchema>;
/** Input for publishers — eventId / occurredAt filled by the bus. */
export type PublishIntegrationEventInput = {
    eventType: string;
    sourceDomain: IntegrationEventSourceDomain;
    schemaVersion: number;
    correlationId: string;
    tenantId: string;
    accountId?: string;
    aggregateId?: string;
    payload: unknown;
};

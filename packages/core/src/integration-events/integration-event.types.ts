/**
 * Integration event type definitions (hand-maintained contracts).
 */

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType?: string;
  description?: string;
  defaultDeliveryMode?: 'sync' | 'async';
}

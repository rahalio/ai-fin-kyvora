/**
 * Zod validators for ULID-based domain IDs (DDD starter).
 */
import { z } from 'zod';
import type { DomainPrefix } from './id-contracts.js';
export declare const ZodULID: z.ZodEffects<z.ZodString, string, string>;
export declare function createDomainIdValidator(domainPrefix: DomainPrefix | 'usr', description?: string): z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
export declare const ZodTntId: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
export declare const ZodAutId: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
export declare const ZodKeyId: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
export declare const ZodIdnId: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
export declare const ZodUsrId: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;

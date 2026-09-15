/**
 * ID Generator Service Implementation — Kyvora prefixes.
 */
import type { DomainCode } from '@kyvora/core/_shared/helpers';
import type { IdGeneratorService } from '@kyvora/services/_shared';
export declare function generateIdWithPrefix(prefix: string): string;
export declare class DefaultIdGeneratorService implements IdGeneratorService {
    tntId(): string;
    keyId(): string;
    idnId(): string;
    autId(): string;
    dirId(): string;
    subId(): string;
    cnsId(): string;
    attId(): string;
    scrId(): string;
    dspId(): string;
    stlId(): string;
    audId(): string;
    generateIdForDomain(domainCode: DomainCode): string;
}
export declare function getIdGeneratorService(): DefaultIdGeneratorService;

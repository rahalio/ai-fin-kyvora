/**
 * IdGeneratorService Port — Kyvora domain prefixes.
 */
import type { DomainCode } from '@kyvora/core/_shared/helpers';
export interface IdGeneratorService {
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

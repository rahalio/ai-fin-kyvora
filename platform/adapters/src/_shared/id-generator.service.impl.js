/**
 * ID Generator Service Implementation — Kyvora prefixes.
 */
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@kyvora/core';
import { ulid } from 'ulid';
export function generateIdWithPrefix(prefix) {
    if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
        throw new Error(`Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`);
    }
    const id = `${prefix}_${ulid().toLowerCase()}`;
    if (!isValidDomainId(id)) {
        throw new Error(`Generated ID "${id}" failed validation.`);
    }
    return id;
}
export class DefaultIdGeneratorService {
    tntId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
    }
    keyId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
    }
    idnId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
    }
    autId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
    }
    dirId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.directory);
    }
    subId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.subjects);
    }
    cnsId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consents);
    }
    attId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.attestations);
    }
    scrId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.screening);
    }
    dspId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.disputes);
    }
    stlId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.settlement);
    }
    audId() {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP.audit);
    }
    generateIdForDomain(domainCode) {
        return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
    }
}
let idGeneratorService = null;
export function getIdGeneratorService() {
    if (!idGeneratorService) {
        idGeneratorService = new DefaultIdGeneratorService();
    }
    return idGeneratorService;
}

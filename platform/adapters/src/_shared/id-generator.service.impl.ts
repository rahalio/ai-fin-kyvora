/**
 * ID Generator Service Implementation — Kyvora prefixes.
 */

import type { DomainCode } from '@kyvora/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@kyvora/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@kyvora/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  dirId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.directory);
  }
  subId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.subjects);
  }
  cnsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consents);
  }
  attId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.attestations);
  }
  scrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.screening);
  }
  dspId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.disputes);
  }
  stlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.settlement);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.audit);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}

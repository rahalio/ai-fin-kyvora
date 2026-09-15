/**
 * ID Contracts — Kyvora
 *
 * Format: {prefix}_{ulid} (lowercase Crockford base32 ULID).
 */
export declare const DOMAIN_PREFIX_MAP: {
    readonly tenant: "tnt";
    readonly auth: "aut";
    readonly apiKey: "key";
    readonly identity: "idn";
    readonly directory: "dir";
    readonly identityProvider: "idp";
    readonly relyingParty: "rly";
    readonly membershipDecision: "mbd";
    readonly subjects: "sub";
    readonly attribute: "atr";
    readonly legalEntityLink: "lnk";
    readonly refreshCycle: "rfr";
    readonly consents: "cns";
    readonly attestations: "att";
    readonly screening: "scr";
    readonly disputes: "dsp";
    readonly feeSchedule: "fee";
    readonly settlement: "inv";
    readonly audit: "aud";
};
export type DomainCode = keyof typeof DOMAIN_PREFIX_MAP;
export type DomainPrefix = (typeof DOMAIN_PREFIX_MAP)[DomainCode];
export declare function isValidDomainId(value: string): boolean;
export declare function extractDomainFromId(id: string): DomainCode | null;

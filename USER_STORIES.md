# Kyvora — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### KYC operations lead (IdP bank)

- As a KYC operations lead, I want to issue reusable attestations from our existing CDD record, so that we stop re-performing the same checks for every partner funnel.
- As a KYC operations lead, I want attestation expiry and refresh queues, so that reusable identity does not create blind spots between CDD cycles.
- As a KYC operations lead, I want to refuse an RP request that asks for attributes beyond the declared purpose, so that we do not overexpose customer data.

### Relying-party onboarding manager (fintech / insurer)

- As an onboarding manager, I want to request a purpose-scoped attestation at a stated assurance level, so that I can open accounts without photographing physical IDs.
- As an onboarding manager, I want a clear decline reason when assurance is insufficient, so that I can fall back to enhanced due diligence instead of guessing.
- As an onboarding manager, I want liability terms on each accepted attestation, so that my counsel knows who bears identity-failure risk.

### End customer (identity subject)

- As a customer, I want to approve exactly which attributes go to which RP, so that proving who I am does not require handing over my whole file.
- As a customer, I want to revoke a sharing relationship, so that a merchant I no longer use cannot keep pulling refreshed attributes.

### Consortium network operator

- As a network operator, I want to suspend an IdP that breaches assurance standards, so that one weak verifier cannot poison the network’s trust.
- As a network operator, I want fee schedules and settlement reports between IdPs and RPs, so that Identity-as-a-Service is an operable market, not a goodwill API.

### Compliance / privacy officer

- As a compliance officer, I want an evidence pack showing consent, purpose, assurance, screening freshness, and liability allocation for any onboarding, so that I can answer a supervisor without reconstructing email threads.
- As a privacy officer, I want automatic rejection of secondary-use purposes not covered by consent, so that “analytics enrichment” cannot ride on a KYC attestation.
- As a compliance officer, when an attestation is disputed as incorrect, I want a time-boxed investigation workflow that freezes dependent onboardings, so that bad identity does not keep propagating.

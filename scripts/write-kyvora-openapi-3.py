#!/usr/bin/env python3
"""Write remaining Kyvora OpenAPI domains: consents, attestations, screening, disputes, settlement, audit."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "packages" / "openapi-core" / "src"

ERR = """        '400':
          $ref: ./common/responses.yaml#/components/responses/BadRequest
        '401':
          $ref: ./common/responses.yaml#/components/responses/Unauthorized
        '404':
          $ref: ./common/responses.yaml#/components/responses/NotFound
        '409':
          $ref: ./common/responses.yaml#/components/responses/Conflict
        '422':
          $ref: ./common/responses.yaml#/components/responses/UnprocessableEntity
        default:
          $ref: ./common/responses.yaml#/components/responses/Problem
"""
ERR_C = ERR.replace(
    "        '404':\n          $ref: ./common/responses.yaml#/components/responses/NotFound\n", ""
)
SEC = """
components:
  securitySchemes:
    apiKey:
      $ref: ./common/security.yaml#/components/securitySchemes/apiKey
    bearerAuth:
      $ref: ./common/security.yaml#/components/securitySchemes/bearerAuth
"""


def header(title, desc, xdomain, tags):
    tag_yaml = "\n".join(f"  - name: {n}\n    description: {d}" for n, d in tags)
    return f"""openapi: 3.1.0
info:
  title: {title}
  version: 0.1.0
  description: |
    {desc}
  x-domain: {xdomain}
  license:
    name: Proprietary
servers:
  - url: https://api.kyvora.local
security:
  - apiKey: []
  - bearerAuth: []
tags:
{tag_yaml}
x-codegen:
  preserveOnClean:
    - extensions
"""


def xddb(repo, et, idv):
    return f"""        x-repository: {repo}
        x-dynamodb:
          entityType: "{et}"
          pkPatternTemplate: "{et}#${{{idv}}}"
          skPatternTemplate: "METADATA"
          pkPattern: entity
          usePkQuery: false
          createdAtField: createdAt
          updatedAtField: updatedAt
          softDeleteEnabled: false
"""


def resp(code, desc, schema):
    return f"""        '{code}':
          description: {desc}
          content:
            application/json:
              schema:
                $ref: {schema}
"""


def write(name, text):
    (ROOT / name).write_text(text)
    print("wrote", name)


# ========== CONSENTS ==========
write(
    "consents.yaml",
    header(
        "Kyvora Consents API",
        "Purpose-limited consent grants, secondary-use rejection, and revocation (BR-6, BR-12).",
        "cns",
        [("Consents", "Consent grants and revocations")],
    )
    + f"""
paths:
  /v1/consents:
    get:
      operationId: listConsentGrants
      tags: [Consents]
      summary: List consent grants for a subject or RP
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: subjectId
          in: query
          schema: {{ type: string }}
        - name: relyingPartyId
          in: query
          schema: {{ type: string }}
        - name: status
          in: query
          schema: {{ type: string, enum: [active, revoked, expired, rejected] }}
      responses:
{resp("200", "Consents page", "./consents.schemas.yaml#/components/schemas/ConsentGrantListResponse")}{ERR_C}{xddb("ConsentGrant", "CONSENT_GRANT", "consentId")}    post:
      operationId: createConsentGrant
      tags: [Consents]
      summary: Grant purpose-limited consent (rejects secondary-use purposes)
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./consents.schemas.yaml#/components/schemas/ConsentGrantCreate
      responses:
{resp("201", "Consent granted", "./consents.schemas.yaml#/components/schemas/ConsentGrantResponse")}{ERR_C}{xddb("ConsentGrant", "CONSENT_GRANT", "consentId")}
  /v1/consents/{{consentId}}:
    get:
      operationId: getConsentGrant
      tags: [Consents]
      summary: Get consent grant
      parameters:
        - name: consentId
          in: path
          required: true
          schema:
            $ref: ./consents.schemas.yaml#/components/schemas/ConsentId
      responses:
{resp("200", "Consent", "./consents.schemas.yaml#/components/schemas/ConsentGrantResponse")}{ERR}{xddb("ConsentGrant", "CONSENT_GRANT", "consentId")}
  /v1/consents/{{consentId}}/revoke:
    post:
      operationId: revokeConsentGrant
      tags: [Consents]
      summary: Revoke a sharing relationship
      parameters:
        - name: consentId
          in: path
          required: true
          schema:
            $ref: ./consents.schemas.yaml#/components/schemas/ConsentId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      responses:
{resp("200", "Consent revoked", "./consents.schemas.yaml#/components/schemas/ConsentGrantResponse")}{ERR}{xddb("ConsentGrant", "CONSENT_GRANT", "consentId")}{SEC}
""",
)

write(
    "consents.schemas.yaml",
    """openapi: 3.1.0
info:
  title: Consents schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    ConsentId:
      type: string
      pattern: '^cns_[0-9A-HJKMNP-TV-Z]{26}$'
    ConsentGrant:
      type: object
      required: [consentId, subjectId, relyingPartyId, purpose, status, grantedAt, createdAt, updatedAt]
      properties:
        consentId:
          $ref: '#/components/schemas/ConsentId'
        subjectId: { type: string }
        relyingPartyId: { type: string }
        purpose: { type: string }
        attributeNames:
          type: array
          items: { type: string }
        status:
          type: string
          enum: [active, revoked, expired, rejected]
        rejectReason: { type: string }
        grantedAt: { type: string, format: date-time }
        revokedAt: { type: string, format: date-time }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    ConsentGrantCreate:
      type: object
      required: [subjectId, relyingPartyId, purpose, attributeNames]
      properties:
        subjectId: { type: string }
        relyingPartyId: { type: string }
        purpose: { type: string }
        attributeNames:
          type: array
          items: { type: string }
    ConsentGrantResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/ConsentGrant'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    ConsentGrantListResponse:
      type: object
      required: [data]
      properties:
        data:
          type: object
          required: [items]
          properties:
            items:
              type: array
              items:
                $ref: '#/components/schemas/ConsentGrant'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
""",
)

# ========== ATTESTATIONS ==========
write(
    "attestations.yaml",
    header(
        "Kyvora Attestations API",
        "Assurance-levelled attestation request, issue, refuse, revoke, and document-recollect exceptions (BR-1, BR-2, BR-3).",
        "att",
        [("Attestations", "Attestation exchange")],
    )
    + f"""
paths:
  /v1/attestations:
    get:
      operationId: listAttestations
      tags: [Attestations]
      summary: List attestations
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema: {{ type: string, enum: [pending, issued, refused, expired, revoked, disputed] }}
        - name: subjectId
          in: query
          schema: {{ type: string }}
        - name: relyingPartyId
          in: query
          schema: {{ type: string }}
      responses:
{resp("200", "Attestations page", "./attestations.schemas.yaml#/components/schemas/AttestationListResponse")}{ERR_C}{xddb("Attestation", "ATTESTATION", "attestationId")}    post:
      operationId: requestAttestation
      tags: [Attestations]
      summary: Request a purpose-scoped attestation (may issue or refuse)
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./attestations.schemas.yaml#/components/schemas/AttestationRequest
      responses:
{resp("201", "Attestation issued or refused", "./attestations.schemas.yaml#/components/schemas/AttestationResponse")}{ERR_C}{xddb("Attestation", "ATTESTATION", "attestationId")}
  /v1/attestations/{{attestationId}}:
    get:
      operationId: getAttestation
      tags: [Attestations]
      summary: Get attestation
      parameters:
        - name: attestationId
          in: path
          required: true
          schema:
            $ref: ./attestations.schemas.yaml#/components/schemas/AttestationId
      responses:
{resp("200", "Attestation", "./attestations.schemas.yaml#/components/schemas/AttestationResponse")}{ERR}{xddb("Attestation", "ATTESTATION", "attestationId")}
  /v1/attestations/{{attestationId}}/issue:
    post:
      operationId: issueAttestation
      tags: [Attestations]
      summary: Issue signed attestation with liability and screening freshness
      parameters:
        - name: attestationId
          in: path
          required: true
          schema:
            $ref: ./attestations.schemas.yaml#/components/schemas/AttestationId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./attestations.schemas.yaml#/components/schemas/AttestationIssue
      responses:
{resp("200", "Issued", "./attestations.schemas.yaml#/components/schemas/AttestationResponse")}{ERR}{xddb("Attestation", "ATTESTATION", "attestationId")}
  /v1/attestations/{{attestationId}}/refuse:
    post:
      operationId: refuseAttestation
      tags: [Attestations]
      summary: Refuse incomplete or over-broad attestation request
      parameters:
        - name: attestationId
          in: path
          required: true
          schema:
            $ref: ./attestations.schemas.yaml#/components/schemas/AttestationId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./attestations.schemas.yaml#/components/schemas/AttestationRefuse
      responses:
{resp("200", "Refused", "./attestations.schemas.yaml#/components/schemas/AttestationResponse")}{ERR}{xddb("Attestation", "ATTESTATION", "attestationId")}
  /v1/attestations/{{attestationId}}/revoke:
    post:
      operationId: revokeAttestation
      tags: [Attestations]
      summary: Revoke or invalidate an attestation
      parameters:
        - name: attestationId
          in: path
          required: true
          schema:
            $ref: ./attestations.schemas.yaml#/components/schemas/AttestationId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./attestations.schemas.yaml#/components/schemas/AttestationRevoke
      responses:
{resp("200", "Revoked", "./attestations.schemas.yaml#/components/schemas/AttestationResponse")}{ERR}{xddb("Attestation", "ATTESTATION", "attestationId")}
  /v1/attestations/{{attestationId}}/document-recollect-exception:
    post:
      operationId: recordDocumentRecollectException
      tags: [Attestations]
      summary: Record policy exception to re-collect documents despite valid attestation (BR-2)
      parameters:
        - name: attestationId
          in: path
          required: true
          schema:
            $ref: ./attestations.schemas.yaml#/components/schemas/AttestationId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./attestations.schemas.yaml#/components/schemas/DocumentRecollectException
      responses:
{resp("200", "Exception recorded", "./attestations.schemas.yaml#/components/schemas/AttestationResponse")}{ERR}{xddb("Attestation", "ATTESTATION", "attestationId")}{SEC}
""",
)

write(
    "attestations.schemas.yaml",
    """openapi: 3.1.0
info:
  title: Attestations schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    AttestationId:
      type: string
      pattern: '^att_[0-9A-HJKMNP-TV-Z]{26}$'
    Attestation:
      type: object
      required: [attestationId, subjectId, identityProviderId, relyingPartyId, assuranceLevel, status, liability, createdAt, updatedAt]
      properties:
        attestationId:
          $ref: '#/components/schemas/AttestationId'
        subjectId: { type: string }
        identityProviderId: { type: string }
        relyingPartyId: { type: string }
        purpose: { type: string }
        attributeNames:
          type: array
          items: { type: string }
        assuranceLevel:
          $ref: ./common/kyvora.yaml#/components/schemas/AssuranceLevel
        status:
          type: string
          enum: [pending, issued, refused, expired, revoked, disputed]
        liability:
          $ref: ./common/kyvora.yaml#/components/schemas/LiabilityAllocation
        screeningSnapshotId: { type: string }
        consentId: { type: string }
        issuedAt: { type: string, format: date-time }
        expiresAt: { type: string, format: date-time }
        refuseReason: { type: string }
        documentRecollectExceptionReason: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    AttestationRequest:
      type: object
      required: [subjectId, relyingPartyId, purpose, requiredAssuranceLevel, attributeNames]
      properties:
        subjectId: { type: string }
        relyingPartyId: { type: string }
        identityProviderId: { type: string }
        purpose: { type: string }
        requiredAssuranceLevel:
          $ref: ./common/kyvora.yaml#/components/schemas/AssuranceLevel
        attributeNames:
          type: array
          items: { type: string }
        consentId: { type: string }
    AttestationIssue:
      type: object
      required: [liability, screeningSnapshotId, consentId]
      properties:
        liability:
          $ref: ./common/kyvora.yaml#/components/schemas/LiabilityAllocation
        screeningSnapshotId: { type: string }
        consentId: { type: string }
        attributeNames:
          type: array
          items: { type: string }
        expiresAt: { type: string, format: date-time }
    AttestationRefuse:
      type: object
      required: [refuseReason]
      properties:
        refuseReason: { type: string }
    AttestationRevoke:
      type: object
      required: [reason]
      properties:
        reason: { type: string }
    DocumentRecollectException:
      type: object
      required: [reason]
      properties:
        reason: { type: string }
    AttestationResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/Attestation'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    AttestationListResponse:
      type: object
      required: [data]
      properties:
        data:
          type: object
          required: [items]
          properties:
            items:
              type: array
              items:
                $ref: '#/components/schemas/Attestation'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
""",
)

# ========== SCREENING ==========
write(
    "screening.yaml",
    header(
        "Kyvora Screening API",
        "Sanctions/PEP screening freshness snapshots and stale invalidation (BR-11).",
        "scr",
        [("Screening", "Screening freshness")],
    )
    + f"""
paths:
  /v1/screening/snapshots:
    get:
      operationId: listScreeningSnapshots
      tags: [Screening]
      summary: List screening snapshots
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: subjectId
          in: query
          schema: {{ type: string }}
      responses:
{resp("200", "Snapshots page", "./screening.schemas.yaml#/components/schemas/ScreeningSnapshotListResponse")}{ERR_C}{xddb("ScreeningSnapshot", "SCREENING_SNAPSHOT", "snapshotId")}    post:
      operationId: refreshScreeningSnapshot
      tags: [Screening]
      summary: Capture a fresh screening snapshot
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./screening.schemas.yaml#/components/schemas/ScreeningSnapshotCreate
      responses:
{resp("201", "Snapshot captured", "./screening.schemas.yaml#/components/schemas/ScreeningSnapshotResponse")}{ERR_C}{xddb("ScreeningSnapshot", "SCREENING_SNAPSHOT", "snapshotId")}
  /v1/screening/snapshots/{{snapshotId}}:
    get:
      operationId: getScreeningSnapshot
      tags: [Screening]
      summary: Get screening snapshot
      parameters:
        - name: snapshotId
          in: path
          required: true
          schema:
            $ref: ./screening.schemas.yaml#/components/schemas/SnapshotId
      responses:
{resp("200", "Snapshot", "./screening.schemas.yaml#/components/schemas/ScreeningSnapshotResponse")}{ERR}{xddb("ScreeningSnapshot", "SCREENING_SNAPSHOT", "snapshotId")}
  /v1/screening/snapshots/{{snapshotId}}/invalidate-dependents:
    post:
      operationId: invalidateStaleScreeningDependents
      tags: [Screening]
      summary: Invalidate attestations dependent on a stale screening snapshot
      parameters:
        - name: snapshotId
          in: path
          required: true
          schema:
            $ref: ./screening.schemas.yaml#/components/schemas/SnapshotId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      responses:
{resp("200", "Dependents invalidated", "./screening.schemas.yaml#/components/schemas/ScreeningInvalidationResponse")}{ERR}{xddb("ScreeningSnapshot", "SCREENING_SNAPSHOT", "snapshotId")}{SEC}
""",
)

write(
    "screening.schemas.yaml",
    """openapi: 3.1.0
info:
  title: Screening schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    SnapshotId:
      type: string
      pattern: '^scr_[0-9A-HJKMNP-TV-Z]{26}$'
    ScreeningSnapshot:
      type: object
      required: [snapshotId, subjectId, status, screenedAt, createdAt, updatedAt]
      properties:
        snapshotId:
          $ref: '#/components/schemas/SnapshotId'
        subjectId: { type: string }
        status:
          type: string
          enum: [clear, hit, inconclusive, stale]
        listsChecked:
          type: array
          items: { type: string }
        screenedAt: { type: string, format: date-time }
        validUntil: { type: string, format: date-time }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    ScreeningSnapshotCreate:
      type: object
      required: [subjectId]
      properties:
        subjectId: { type: string }
        listsChecked:
          type: array
          items: { type: string }
        validUntil: { type: string, format: date-time }
    ScreeningInvalidation:
      type: object
      required: [snapshotId, invalidatedAttestationIds]
      properties:
        snapshotId:
          $ref: '#/components/schemas/SnapshotId'
        invalidatedAttestationIds:
          type: array
          items: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    ScreeningSnapshotResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/ScreeningSnapshot'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    ScreeningSnapshotListResponse:
      type: object
      required: [data]
      properties:
        data:
          type: object
          required: [items]
          properties:
            items:
              type: array
              items:
                $ref: '#/components/schemas/ScreeningSnapshot'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    ScreeningInvalidationResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/ScreeningInvalidation'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
""",
)

# ========== DISPUTES ==========
write(
    "disputes.yaml",
    header(
        "Kyvora Disputes API",
        "Incorrect-attribute disputes, dependent onboarding freeze, and resolution (BR-10).",
        "dsp",
        [("Disputes", "Dispute cases and freezes")],
    )
    + f"""
paths:
  /v1/disputes:
    get:
      operationId: listDisputeCases
      tags: [Disputes]
      summary: List dispute cases
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema: {{ type: string, enum: [open, investigating, upheld, rejected, closed] }}
      responses:
{resp("200", "Disputes page", "./disputes.schemas.yaml#/components/schemas/DisputeCaseListResponse")}{ERR_C}{xddb("DisputeCase", "DISPUTE_CASE", "disputeId")}    post:
      operationId: openDisputeCase
      tags: [Disputes]
      summary: Open dispute and freeze dependent onboardings
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./disputes.schemas.yaml#/components/schemas/DisputeCaseCreate
      responses:
{resp("201", "Dispute opened", "./disputes.schemas.yaml#/components/schemas/DisputeCaseResponse")}{ERR_C}{xddb("DisputeCase", "DISPUTE_CASE", "disputeId")}
  /v1/disputes/{{disputeId}}:
    get:
      operationId: getDisputeCase
      tags: [Disputes]
      summary: Get dispute case
      parameters:
        - name: disputeId
          in: path
          required: true
          schema:
            $ref: ./disputes.schemas.yaml#/components/schemas/DisputeId
      responses:
{resp("200", "Dispute", "./disputes.schemas.yaml#/components/schemas/DisputeCaseResponse")}{ERR}{xddb("DisputeCase", "DISPUTE_CASE", "disputeId")}
  /v1/disputes/{{disputeId}}/resolve:
    post:
      operationId: resolveDisputeCase
      tags: [Disputes]
      summary: Resolve dispute (uphold/reject/close) and optionally revoke attestation
      parameters:
        - name: disputeId
          in: path
          required: true
          schema:
            $ref: ./disputes.schemas.yaml#/components/schemas/DisputeId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./disputes.schemas.yaml#/components/schemas/DisputeCaseResolve
      responses:
{resp("200", "Resolved", "./disputes.schemas.yaml#/components/schemas/DisputeCaseResponse")}{ERR}{xddb("DisputeCase", "DISPUTE_CASE", "disputeId")}{SEC}
""",
)

write(
    "disputes.schemas.yaml",
    """openapi: 3.1.0
info:
  title: Disputes schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    DisputeId:
      type: string
      pattern: '^dsp_[0-9A-HJKMNP-TV-Z]{26}$'
    DisputeCase:
      type: object
      required: [disputeId, attestationId, status, openedAt, freezeDependentOnboardings, createdAt, updatedAt]
      properties:
        disputeId:
          $ref: '#/components/schemas/DisputeId'
        attestationId: { type: string }
        status:
          type: string
          enum: [open, investigating, upheld, rejected, closed]
        reason: { type: string }
        freezeDependentOnboardings: { type: boolean }
        frozenOnboardingIds:
          type: array
          items: { type: string }
        resolutionNotes: { type: string }
        openedAt: { type: string, format: date-time }
        resolvedAt: { type: string, format: date-time }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    DisputeCaseCreate:
      type: object
      required: [attestationId, reason]
      properties:
        attestationId: { type: string }
        reason: { type: string }
        freezeDependentOnboardings:
          type: boolean
          default: true
    DisputeCaseResolve:
      type: object
      required: [status]
      properties:
        status:
          type: string
          enum: [upheld, rejected, closed]
        resolutionNotes: { type: string }
        revokeAttestation: { type: boolean }
    DisputeCaseResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/DisputeCase'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    DisputeCaseListResponse:
      type: object
      required: [data]
      properties:
        data:
          type: object
          required: [items]
          properties:
            items:
              type: array
              items:
                $ref: '#/components/schemas/DisputeCase'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
""",
)

# ========== SETTLEMENT ==========
write(
    "settlement.yaml",
    header(
        "Kyvora Settlement API",
        "Identity-as-a-Service fee schedules, invoices, and export (BR-4).",
        "stl",
        [
            ("FeeSchedules", "IdP fee schedules"),
            ("Invoices", "Settlement invoices"),
        ],
    )
    + f"""
paths:
  /v1/settlement/fee-schedules:
    get:
      operationId: listFeeSchedules
      tags: [FeeSchedules]
      summary: List fee schedules
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: identityProviderId
          in: query
          schema: {{ type: string }}
      responses:
{resp("200", "Fee schedules", "./settlement.schemas.yaml#/components/schemas/FeeScheduleListResponse")}{ERR_C}{xddb("FeeSchedule", "FEE_SCHEDULE", "scheduleId")}    post:
      operationId: upsertFeeSchedule
      tags: [FeeSchedules]
      summary: Create or update fee schedule
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./settlement.schemas.yaml#/components/schemas/FeeScheduleUpsert
      responses:
{resp("201", "Fee schedule saved", "./settlement.schemas.yaml#/components/schemas/FeeScheduleResponse")}{ERR_C}{xddb("FeeSchedule", "FEE_SCHEDULE", "scheduleId")}
  /v1/settlement/fee-schedules/{{scheduleId}}:
    get:
      operationId: getFeeSchedule
      tags: [FeeSchedules]
      summary: Get fee schedule
      parameters:
        - name: scheduleId
          in: path
          required: true
          schema:
            $ref: ./settlement.schemas.yaml#/components/schemas/ScheduleId
      responses:
{resp("200", "Fee schedule", "./settlement.schemas.yaml#/components/schemas/FeeScheduleResponse")}{ERR}{xddb("FeeSchedule", "FEE_SCHEDULE", "scheduleId")}
  /v1/settlement/invoices:
    get:
      operationId: listSettlementInvoices
      tags: [Invoices]
      summary: List settlement invoices
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema: {{ type: string, enum: [open, paid, void] }}
      responses:
{resp("200", "Invoices page", "./settlement.schemas.yaml#/components/schemas/SettlementInvoiceListResponse")}{ERR_C}{xddb("SettlementInvoice", "SETTLEMENT_INVOICE", "invoiceId")}    post:
      operationId: generateSettlementInvoice
      tags: [Invoices]
      summary: Generate an IaaS settlement invoice for a period
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./settlement.schemas.yaml#/components/schemas/SettlementInvoiceGenerate
      responses:
{resp("201", "Invoice generated", "./settlement.schemas.yaml#/components/schemas/SettlementInvoiceResponse")}{ERR_C}{xddb("SettlementInvoice", "SETTLEMENT_INVOICE", "invoiceId")}
  /v1/settlement/invoices/{{invoiceId}}:
    get:
      operationId: getSettlementInvoice
      tags: [Invoices]
      summary: Get settlement invoice
      parameters:
        - name: invoiceId
          in: path
          required: true
          schema:
            $ref: ./settlement.schemas.yaml#/components/schemas/InvoiceId
      responses:
{resp("200", "Invoice", "./settlement.schemas.yaml#/components/schemas/SettlementInvoiceResponse")}{ERR}{xddb("SettlementInvoice", "SETTLEMENT_INVOICE", "invoiceId")}
  /v1/settlement/invoices/{{invoiceId}}/export:
    post:
      operationId: exportSettlementInvoice
      tags: [Invoices]
      summary: Export invoice for ERP recognition
      parameters:
        - name: invoiceId
          in: path
          required: true
          schema:
            $ref: ./settlement.schemas.yaml#/components/schemas/InvoiceId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      responses:
{resp("200", "Export payload", "./settlement.schemas.yaml#/components/schemas/SettlementInvoiceExportResponse")}{ERR}{xddb("SettlementInvoice", "SETTLEMENT_INVOICE", "invoiceId")}{SEC}
""",
)

write(
    "settlement.schemas.yaml",
    """openapi: 3.1.0
info:
  title: Settlement schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    ScheduleId:
      type: string
      pattern: '^fee_[0-9A-HJKMNP-TV-Z]{26}$'
    InvoiceId:
      type: string
      pattern: '^inv_[0-9A-HJKMNP-TV-Z]{26}$'
    FeeSchedule:
      type: object
      required: [scheduleId, identityProviderId, initiationFee, perAttestationFee, createdAt, updatedAt]
      properties:
        scheduleId:
          $ref: '#/components/schemas/ScheduleId'
        identityProviderId: { type: string }
        initiationFee: { type: number, format: double }
        monthlyFee: { type: number, format: double }
        perAttestationFee: { type: number, format: double }
        currency: { type: string, default: USD }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    FeeScheduleUpsert:
      type: object
      required: [identityProviderId, initiationFee, perAttestationFee]
      properties:
        identityProviderId: { type: string }
        initiationFee: { type: number, format: double }
        monthlyFee: { type: number, format: double }
        perAttestationFee: { type: number, format: double }
        currency: { type: string, default: USD }
    SettlementInvoice:
      type: object
      required: [invoiceId, relyingPartyId, identityProviderId, period, amount, status, createdAt, updatedAt]
      properties:
        invoiceId:
          $ref: '#/components/schemas/InvoiceId'
        relyingPartyId: { type: string }
        identityProviderId: { type: string }
        period: { type: string }
        amount: { type: number, format: double }
        currency: { type: string }
        attestationCount: { type: integer }
        status:
          type: string
          enum: [open, paid, void]
        exportUri: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    SettlementInvoiceGenerate:
      type: object
      required: [relyingPartyId, identityProviderId, period]
      properties:
        relyingPartyId: { type: string }
        identityProviderId: { type: string }
        period: { type: string }
    SettlementInvoiceExport:
      type: object
      required: [invoiceId, exportUri, exportedAt]
      properties:
        invoiceId:
          $ref: '#/components/schemas/InvoiceId'
        exportUri: { type: string }
        exportedAt: { type: string, format: date-time }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    FeeScheduleResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/FeeSchedule'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    FeeScheduleListResponse:
      type: object
      required: [data]
      properties:
        data:
          type: object
          required: [items]
          properties:
            items:
              type: array
              items:
                $ref: '#/components/schemas/FeeSchedule'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    SettlementInvoiceResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/SettlementInvoice'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    SettlementInvoiceListResponse:
      type: object
      required: [data]
      properties:
        data:
          type: object
          required: [items]
          properties:
            items:
              type: array
              items:
                $ref: '#/components/schemas/SettlementInvoice'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    SettlementInvoiceExportResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/SettlementInvoiceExport'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
""",
)

# ========== AUDIT ==========
write(
    "audit.yaml",
    header(
        "Kyvora Audit API",
        "Supervisory evidence pack generation and download (BR-10).",
        "aud",
        [("EvidencePacks", "Supervisory evidence packs")],
    )
    + f"""
paths:
  /v1/audit/evidence-packs:
    get:
      operationId: listEvidencePacks
      tags: [EvidencePacks]
      summary: List evidence packs
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
{resp("200", "Evidence packs", "./audit.schemas.yaml#/components/schemas/EvidencePackListResponse")}{ERR_C}{xddb("EvidencePack", "EVIDENCE_PACK", "packId")}    post:
      operationId: generateEvidencePack
      tags: [EvidencePacks]
      summary: Generate supervisory evidence pack for an onboarding/attestation
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./audit.schemas.yaml#/components/schemas/EvidencePackGenerate
      responses:
{resp("201", "Pack generated", "./audit.schemas.yaml#/components/schemas/EvidencePackResponse")}{ERR_C}{xddb("EvidencePack", "EVIDENCE_PACK", "packId")}
  /v1/audit/evidence-packs/{{packId}}:
    get:
      operationId: getEvidencePack
      tags: [EvidencePacks]
      summary: Get evidence pack metadata and completeness
      parameters:
        - name: packId
          in: path
          required: true
          schema:
            $ref: ./audit.schemas.yaml#/components/schemas/PackId
      responses:
{resp("200", "Evidence pack", "./audit.schemas.yaml#/components/schemas/EvidencePackResponse")}{ERR}{xddb("EvidencePack", "EVIDENCE_PACK", "packId")}
  /v1/audit/evidence-packs/{{packId}}/download:
    get:
      operationId: downloadEvidencePack
      tags: [EvidencePacks]
      summary: Download complete evidence pack (blocked if incomplete)
      parameters:
        - name: packId
          in: path
          required: true
          schema:
            $ref: ./audit.schemas.yaml#/components/schemas/PackId
      responses:
{resp("200", "Download descriptor", "./audit.schemas.yaml#/components/schemas/EvidencePackDownloadResponse")}{ERR}{xddb("EvidencePack", "EVIDENCE_PACK", "packId")}{SEC}
""",
)

write(
    "audit.schemas.yaml",
    """openapi: 3.1.0
info:
  title: Audit schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    PackId:
      type: string
      pattern: '^aud_[0-9A-HJKMNP-TV-Z]{26}$'
    EvidencePack:
      type: object
      required: [packId, attestationId, status, artefacts, createdAt, updatedAt]
      properties:
        packId:
          $ref: '#/components/schemas/PackId'
        attestationId: { type: string }
        subjectId: { type: string }
        status:
          type: string
          enum: [complete, incomplete]
        missingFields:
          type: array
          items: { type: string }
        artefacts:
          type: array
          items: { type: string }
        retentionUntil: { type: string, format: date-time }
        downloadUri: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    EvidencePackGenerate:
      type: object
      required: [attestationId]
      properties:
        attestationId: { type: string }
        subjectId: { type: string }
    EvidencePackDownload:
      type: object
      required: [packId, downloadUri]
      properties:
        packId:
          $ref: '#/components/schemas/PackId'
        downloadUri: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    EvidencePackResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/EvidencePack'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    EvidencePackListResponse:
      type: object
      required: [data]
      properties:
        data:
          type: object
          required: [items]
          properties:
            items:
              type: array
              items:
                $ref: '#/components/schemas/EvidencePack'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    EvidencePackDownloadResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/EvidencePackDownload'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
""",
)

print("all remaining domains written")

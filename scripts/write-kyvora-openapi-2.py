#!/usr/bin/env python3
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


def env(entity, list_=True):
    s = f"""    {entity}Response:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/{entity}'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
"""
    if list_:
        s += f"""    {entity}ListResponse:
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
                $ref: '#/components/schemas/{entity}'
            nextCursor: {{ type: string }}
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
"""
    return s


def id_schema(name, prefix):
    return f"""    {name}:
      type: string
      pattern: '^{prefix}_[0-9A-HJKMNP-TV-Z]{{26}}$'
"""


# SUBJECTS
write_subjects = header(
    "Kyvora Subjects API",
    "Identity subjects, verified attributes, legal-entity links, inclusion tiers, CDD refresh cycles (BR-5, BR-7, BR-8).",
    "sub",
    [
        ("Subjects", "Individuals and legal entities"),
        ("Attributes", "Verified attributes with provenance"),
        ("LegalEntityLinks", "Director/UBO edges"),
        ("RefreshCycles", "Time-boxed CDD refresh"),
    ],
) + f"""
paths:
  /v1/subjects:
    get:
      operationId: listSubjects
      tags: [Subjects]
      summary: List identity subjects
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: subjectType
          in: query
          schema: {{ type: string, enum: [individual, legalEntity] }}
      responses:
{resp("200", "Subjects page", "./subjects.schemas.yaml#/components/schemas/IdentitySubjectListResponse")}{ERR_C}{xddb("IdentitySubject", "IDENTITY_SUBJECT", "subjectId")}    post:
      operationId: createSubject
      tags: [Subjects]
      summary: Register an identity subject
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./subjects.schemas.yaml#/components/schemas/IdentitySubjectCreate
      responses:
{resp("201", "Subject created", "./subjects.schemas.yaml#/components/schemas/IdentitySubjectResponse")}{ERR_C}{xddb("IdentitySubject", "IDENTITY_SUBJECT", "subjectId")}
  /v1/subjects/{{subjectId}}:
    get:
      operationId: getSubject
      tags: [Subjects]
      summary: Get identity subject
      parameters:
        - name: subjectId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/SubjectId
      responses:
{resp("200", "Subject", "./subjects.schemas.yaml#/components/schemas/IdentitySubjectResponse")}{ERR}{xddb("IdentitySubject", "IDENTITY_SUBJECT", "subjectId")}    patch:
      operationId: updateSubject
      tags: [Subjects]
      summary: Update subject inclusion tier or display ref
      parameters:
        - name: subjectId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/SubjectId
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./subjects.schemas.yaml#/components/schemas/IdentitySubjectUpdate
      responses:
{resp("200", "Updated", "./subjects.schemas.yaml#/components/schemas/IdentitySubjectResponse")}{ERR}{xddb("IdentitySubject", "IDENTITY_SUBJECT", "subjectId")}
  /v1/subjects/{{subjectId}}/attributes:
    get:
      operationId: listSubjectAttributes
      tags: [Attributes]
      summary: List verified attributes (IdP-scoped, not a network honeypot)
      parameters:
        - name: subjectId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/SubjectId
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
{resp("200", "Attributes", "./subjects.schemas.yaml#/components/schemas/AttributeRecordListResponse")}{ERR}{xddb("AttributeRecord", "ATTRIBUTE_RECORD", "attributeId")}    post:
      operationId: registerSubjectAttribute
      tags: [Attributes]
      summary: Register a verified attribute
      parameters:
        - name: subjectId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/SubjectId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./subjects.schemas.yaml#/components/schemas/AttributeRecordCreate
      responses:
{resp("201", "Attribute registered", "./subjects.schemas.yaml#/components/schemas/AttributeRecordResponse")}{ERR}{xddb("AttributeRecord", "ATTRIBUTE_RECORD", "attributeId")}
  /v1/subjects/{{subjectId}}/legal-entity-links:
    get:
      operationId: listLegalEntityLinks
      tags: [LegalEntityLinks]
      summary: List director/UBO links
      parameters:
        - name: subjectId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/SubjectId
      responses:
{resp("200", "Links", "./subjects.schemas.yaml#/components/schemas/LegalEntityLinkListResponse")}{ERR}{xddb("LegalEntityLink", "LEGAL_ENTITY_LINK", "linkId")}    post:
      operationId: createLegalEntityLink
      tags: [LegalEntityLinks]
      summary: Link an individual to a legal entity
      parameters:
        - name: subjectId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/SubjectId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./subjects.schemas.yaml#/components/schemas/LegalEntityLinkCreate
      responses:
{resp("201", "Linked", "./subjects.schemas.yaml#/components/schemas/LegalEntityLinkResponse")}{ERR}{xddb("LegalEntityLink", "LEGAL_ENTITY_LINK", "linkId")}
  /v1/legal-entity-links/{{linkId}}:
    delete:
      operationId: unlinkLegalEntity
      tags: [LegalEntityLinks]
      summary: Unlink with audit
      parameters:
        - name: linkId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/LinkId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      responses:
        '204':
          description: Unlinked
{ERR}{xddb("LegalEntityLink", "LEGAL_ENTITY_LINK", "linkId")}
  /v1/refresh-cycles:
    get:
      operationId: listRefreshCycles
      tags: [RefreshCycles]
      summary: List CDD refresh cycles
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema: {{ type: string, enum: [scheduled, completed, overdue] }}
      responses:
{resp("200", "Refresh cycles", "./subjects.schemas.yaml#/components/schemas/RefreshCycleListResponse")}{ERR_C}{xddb("RefreshCycle", "REFRESH_CYCLE", "cycleId")}    post:
      operationId: createRefreshCycle
      tags: [RefreshCycles]
      summary: Schedule a refresh cycle
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./subjects.schemas.yaml#/components/schemas/RefreshCycleCreate
      responses:
{resp("201", "Scheduled", "./subjects.schemas.yaml#/components/schemas/RefreshCycleResponse")}{ERR_C}{xddb("RefreshCycle", "REFRESH_CYCLE", "cycleId")}
  /v1/refresh-cycles/{{cycleId}}/complete:
    post:
      operationId: completeRefreshCycle
      tags: [RefreshCycles]
      summary: Complete or force re-verify
      parameters:
        - name: cycleId
          in: path
          required: true
          schema:
            $ref: ./subjects.schemas.yaml#/components/schemas/CycleId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        content:
          application/json:
            schema:
              $ref: ./subjects.schemas.yaml#/components/schemas/RefreshCycleComplete
      responses:
{resp("200", "Completed", "./subjects.schemas.yaml#/components/schemas/RefreshCycleResponse")}{ERR}{xddb("RefreshCycle", "REFRESH_CYCLE", "cycleId")}{SEC}
"""

(ROOT / "subjects.yaml").write_text(write_subjects)

(ROOT / "subjects.schemas.yaml").write_text(
    """openapi: 3.1.0
info:
  title: Subjects schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    SubjectId:
      type: string
      pattern: '^sub_[0-9A-HJKMNP-TV-Z]{26}$'
    AttributeId:
      type: string
      pattern: '^atr_[0-9A-HJKMNP-TV-Z]{26}$'
    LinkId:
      type: string
      pattern: '^lnk_[0-9A-HJKMNP-TV-Z]{26}$'
    CycleId:
      type: string
      pattern: '^rfr_[0-9A-HJKMNP-TV-Z]{26}$'
    IdentitySubject:
      type: object
      required: [subjectId, subjectType, createdAt, updatedAt]
      properties:
        subjectId:
          $ref: '#/components/schemas/SubjectId'
        subjectType:
          type: string
          enum: [individual, legalEntity]
        displayRef: { type: string }
        inclusionTier:
          type: string
          enum: [standard, alternativeEvidence]
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    IdentitySubjectCreate:
      type: object
      required: [subjectType]
      properties:
        subjectType:
          type: string
          enum: [individual, legalEntity]
        displayRef: { type: string }
        inclusionTier:
          type: string
          enum: [standard, alternativeEvidence]
    IdentitySubjectUpdate:
      type: object
      properties:
        displayRef: { type: string }
        inclusionTier:
          type: string
          enum: [standard, alternativeEvidence]
    AttributeRecord:
      type: object
      required: [attributeId, subjectId, name, assuranceLevel, verifiedAt, createdAt, updatedAt]
      properties:
        attributeId:
          $ref: '#/components/schemas/AttributeId'
        subjectId:
          $ref: '#/components/schemas/SubjectId'
        name: { type: string }
        valueHash: { type: string }
        assuranceLevel:
          $ref: ./common/kyvora.yaml#/components/schemas/AssuranceLevel
        verifiedAt: { type: string, format: date-time }
        expiresAt: { type: string, format: date-time }
        source: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    AttributeRecordCreate:
      type: object
      required: [name, value, assuranceLevel]
      properties:
        name: { type: string }
        value: { type: string }
        assuranceLevel:
          $ref: ./common/kyvora.yaml#/components/schemas/AssuranceLevel
        expiresAt: { type: string, format: date-time }
        source: { type: string }
    LegalEntityLink:
      type: object
      required: [linkId, individualSubjectId, legalEntitySubjectId, role, createdAt, updatedAt]
      properties:
        linkId:
          $ref: '#/components/schemas/LinkId'
        individualSubjectId:
          $ref: '#/components/schemas/SubjectId'
        legalEntitySubjectId:
          $ref: '#/components/schemas/SubjectId'
        role:
          type: string
          enum: [director, ubo, signatory]
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    LegalEntityLinkCreate:
      type: object
      required: [individualSubjectId, legalEntitySubjectId, role]
      properties:
        individualSubjectId:
          $ref: '#/components/schemas/SubjectId'
        legalEntitySubjectId:
          $ref: '#/components/schemas/SubjectId'
        role:
          type: string
          enum: [director, ubo, signatory]
    RefreshCycle:
      type: object
      required: [cycleId, subjectId, dueAt, status, createdAt, updatedAt]
      properties:
        cycleId:
          $ref: '#/components/schemas/CycleId'
        subjectId:
          $ref: '#/components/schemas/SubjectId'
        dueAt: { type: string, format: date-time }
        status:
          type: string
          enum: [scheduled, completed, overdue]
        changeSignals:
          type: array
          items: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    RefreshCycleCreate:
      type: object
      required: [subjectId, dueAt]
      properties:
        subjectId:
          $ref: '#/components/schemas/SubjectId'
        dueAt: { type: string, format: date-time }
        changeSignals:
          type: array
          items: { type: string }
    RefreshCycleComplete:
      type: object
      properties:
        status:
          type: string
          enum: [completed, overdue]
    IdentitySubjectResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/IdentitySubject'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    IdentitySubjectListResponse:
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
                $ref: '#/components/schemas/IdentitySubject'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    AttributeRecordResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/AttributeRecord'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    AttributeRecordListResponse:
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
                $ref: '#/components/schemas/AttributeRecord'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    LegalEntityLinkResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/LegalEntityLink'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    LegalEntityLinkListResponse:
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
                $ref: '#/components/schemas/LegalEntityLink'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    RefreshCycleResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/RefreshCycle'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
    RefreshCycleListResponse:
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
                $ref: '#/components/schemas/RefreshCycle'
            nextCursor: { type: string }
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
"""
)

print("subjects ok")

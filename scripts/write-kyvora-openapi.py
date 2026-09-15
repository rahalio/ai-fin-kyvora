#!/usr/bin/env python3
"""Write Kyvora product OpenAPI YAML (one file per domain)."""
from __future__ import annotations

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

ERR_CREATE = ERR.replace(
    "        '404':\n          $ref: ./common/responses.yaml#/components/responses/NotFound\n",
    "",
)

SEC = """
components:
  securitySchemes:
    apiKey:
      $ref: ./common/security.yaml#/components/securitySchemes/apiKey
    bearerAuth:
      $ref: ./common/security.yaml#/components/securitySchemes/bearerAuth
"""


def header(title: str, desc: str, xdomain: str, tags: list[tuple[str, str]]) -> str:
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
    description: Local API
security:
  - apiKey: []
  - bearerAuth: []
tags:
{tag_yaml}
x-codegen:
  preserveOnClean:
    - extensions
"""


def xddb(repo: str, entity_type: str, pk: str, id_var: str) -> str:
    return f"""        x-repository: {repo}
        x-dynamodb:
          entityType: "{entity_type}"
          pkPatternTemplate: "{entity_type}#${{{id_var}}}"
          skPatternTemplate: "METADATA"
          pkPattern: entity
          usePkQuery: false
          createdAtField: createdAt
          updatedAtField: updatedAt
          softDeleteEnabled: false
"""


def resp(code: str, desc: str, schema: str) -> str:
    return f"""        '{code}':
          description: {desc}
          content:
            application/json:
              schema:
                $ref: {schema}
"""


def envelope_block(name: str, entity: str, list_name: str | None = None) -> str:
    block = f"""    {name}Response:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/{entity}'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
"""
    if list_name:
        block += f"""    {list_name}:
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
            nextCursor:
              type: string
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
"""
    return block


def write(name: str, text: str) -> None:
    path = ROOT / name
    path.write_text(text)
    print("wrote", path.relative_to(ROOT.parent.parent.parent))


# ---------- directory ----------
write(
    "directory.yaml",
    header(
        "Kyvora Directory API",
        "IdP and RP membership, certification, suspension, and auditable decision trail (BR-9).",
        "dir",
        [
            ("IdentityProviders", "Bank identity providers"),
            ("RelyingParties", "Relying parties"),
            ("MembershipDecisions", "Certify/suspend audit trail"),
        ],
    )
    + """
paths:
  /v1/directory/identity-providers:
    get:
      operationId: listIdentityProviders
      tags: [IdentityProviders]
      summary: List identity providers
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            $ref: ./common/kyvora.yaml#/components/schemas/MemberStatus
      responses:
"""
    + resp("200", "IdP page", "./directory.schemas.yaml#/components/schemas/IdentityProviderListResponse")
    + ERR_CREATE
    + xddb("IdentityProvider", "IDENTITY_PROVIDER", "IDENTITY_PROVIDER", "idpId")
    + """    post:
      operationId: registerIdentityProvider
      tags: [IdentityProviders]
      summary: Register an identity provider
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./directory.schemas.yaml#/components/schemas/IdentityProviderCreate
      responses:
"""
    + resp("201", "IdP registered", "./directory.schemas.yaml#/components/schemas/IdentityProviderResponse")
    + ERR_CREATE
    + xddb("IdentityProvider", "IDENTITY_PROVIDER", "IDENTITY_PROVIDER", "idpId")
    + """
  /v1/directory/identity-providers/{idpId}:
    get:
      operationId: getIdentityProvider
      tags: [IdentityProviders]
      summary: Get identity provider
      parameters:
        - name: idpId
          in: path
          required: true
          schema:
            $ref: ./directory.schemas.yaml#/components/schemas/IdpId
      responses:
"""
    + resp("200", "IdP", "./directory.schemas.yaml#/components/schemas/IdentityProviderResponse")
    + ERR
    + xddb("IdentityProvider", "IDENTITY_PROVIDER", "IDENTITY_PROVIDER", "idpId")
    + """
  /v1/directory/identity-providers/{idpId}/certify:
    post:
      operationId: certifyIdentityProvider
      tags: [IdentityProviders]
      summary: Certify an IdP against published standards
      parameters:
        - name: idpId
          in: path
          required: true
          schema:
            $ref: ./directory.schemas.yaml#/components/schemas/IdpId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./directory.schemas.yaml#/components/schemas/MembershipDecisionCreate
      responses:
"""
    + resp("200", "Certified", "./directory.schemas.yaml#/components/schemas/IdentityProviderResponse")
    + ERR
    + xddb("IdentityProvider", "IDENTITY_PROVIDER", "IDENTITY_PROVIDER", "idpId")
    + """
  /v1/directory/identity-providers/{idpId}/suspend:
    post:
      operationId: suspendIdentityProvider
      tags: [IdentityProviders]
      summary: Suspend an IdP that breaches assurance standards
      parameters:
        - name: idpId
          in: path
          required: true
          schema:
            $ref: ./directory.schemas.yaml#/components/schemas/IdpId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./directory.schemas.yaml#/components/schemas/MembershipDecisionCreate
      responses:
"""
    + resp("202", "Suspended", "./directory.schemas.yaml#/components/schemas/IdentityProviderResponse")
    + ERR
    + xddb("IdentityProvider", "IDENTITY_PROVIDER", "IDENTITY_PROVIDER", "idpId")
    + """
  /v1/directory/relying-parties:
    get:
      operationId: listRelyingParties
      tags: [RelyingParties]
      summary: List relying parties
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            $ref: ./common/kyvora.yaml#/components/schemas/MemberStatus
      responses:
"""
    + resp("200", "RP page", "./directory.schemas.yaml#/components/schemas/RelyingPartyListResponse")
    + ERR_CREATE
    + xddb("RelyingParty", "RELYING_PARTY", "RELYING_PARTY", "rpId")
    + """    post:
      operationId: registerRelyingParty
      tags: [RelyingParties]
      summary: Register a relying party
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./directory.schemas.yaml#/components/schemas/RelyingPartyCreate
      responses:
"""
    + resp("201", "RP registered", "./directory.schemas.yaml#/components/schemas/RelyingPartyResponse")
    + ERR_CREATE
    + xddb("RelyingParty", "RELYING_PARTY", "RELYING_PARTY", "rpId")
    + """
  /v1/directory/relying-parties/{rpId}:
    get:
      operationId: getRelyingParty
      tags: [RelyingParties]
      summary: Get relying party
      parameters:
        - name: rpId
          in: path
          required: true
          schema:
            $ref: ./directory.schemas.yaml#/components/schemas/RpId
      responses:
"""
    + resp("200", "RP", "./directory.schemas.yaml#/components/schemas/RelyingPartyResponse")
    + ERR
    + xddb("RelyingParty", "RELYING_PARTY", "RELYING_PARTY", "rpId")
    + """
  /v1/directory/relying-parties/{rpId}/certify:
    post:
      operationId: certifyRelyingParty
      tags: [RelyingParties]
      summary: Certify a relying party
      parameters:
        - name: rpId
          in: path
          required: true
          schema:
            $ref: ./directory.schemas.yaml#/components/schemas/RpId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./directory.schemas.yaml#/components/schemas/MembershipDecisionCreate
      responses:
"""
    + resp("200", "Certified", "./directory.schemas.yaml#/components/schemas/RelyingPartyResponse")
    + ERR
    + xddb("RelyingParty", "RELYING_PARTY", "RELYING_PARTY", "rpId")
    + """
  /v1/directory/relying-parties/{rpId}/suspend:
    post:
      operationId: suspendRelyingParty
      tags: [RelyingParties]
      summary: Suspend a relying party
      parameters:
        - name: rpId
          in: path
          required: true
          schema:
            $ref: ./directory.schemas.yaml#/components/schemas/RpId
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./directory.schemas.yaml#/components/schemas/MembershipDecisionCreate
      responses:
"""
    + resp("202", "Suspended", "./directory.schemas.yaml#/components/schemas/RelyingPartyResponse")
    + ERR
    + xddb("RelyingParty", "RELYING_PARTY", "RELYING_PARTY", "rpId")
    + """
  /v1/directory/membership-decisions:
    get:
      operationId: listMembershipDecisions
      tags: [MembershipDecisions]
      summary: List certify/suspend decisions
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: memberId
          in: query
          schema:
            type: string
      responses:
"""
    + resp("200", "Decision trail", "./directory.schemas.yaml#/components/schemas/MembershipDecisionListResponse")
    + ERR_CREATE
    + xddb("MembershipDecision", "MEMBERSHIP_DECISION", "MEMBERSHIP_DECISION", "decisionId")
    + SEC,
)

write(
    "directory.schemas.yaml",
    """openapi: 3.1.0
info:
  title: Directory schemas
  version: 0.1.0
paths: {}
components:
  schemas:
    IdpId:
      type: string
      pattern: '^idp_[0-9A-HJKMNP-TV-Z]{26}$'
    RpId:
      type: string
      pattern: '^rly_[0-9A-HJKMNP-TV-Z]{26}$'
    DecisionId:
      type: string
      pattern: '^mbd_[0-9A-HJKMNP-TV-Z]{26}$'
    IdentityProvider:
      type: object
      required: [idpId, legalName, status, maxAssuranceLevel, createdAt, updatedAt]
      properties:
        idpId:
          $ref: '#/components/schemas/IdpId'
        legalName: { type: string }
        status:
          $ref: ./common/kyvora.yaml#/components/schemas/MemberStatus
        maxAssuranceLevel:
          $ref: ./common/kyvora.yaml#/components/schemas/AssuranceLevel
        jurisdictions:
          type: array
          items: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    IdentityProviderCreate:
      type: object
      required: [legalName, maxAssuranceLevel]
      properties:
        legalName: { type: string }
        maxAssuranceLevel:
          $ref: ./common/kyvora.yaml#/components/schemas/AssuranceLevel
        jurisdictions:
          type: array
          items: { type: string }
    RelyingParty:
      type: object
      required: [rpId, legalName, status, allowedPurposes, createdAt, updatedAt]
      properties:
        rpId:
          $ref: '#/components/schemas/RpId'
        legalName: { type: string }
        status:
          $ref: ./common/kyvora.yaml#/components/schemas/MemberStatus
        allowedPurposes:
          type: array
          items: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    RelyingPartyCreate:
      type: object
      required: [legalName, allowedPurposes]
      properties:
        legalName: { type: string }
        allowedPurposes:
          type: array
          items: { type: string }
    MembershipDecision:
      type: object
      required: [decisionId, memberId, memberType, action, reason, decidedAt]
      properties:
        decisionId:
          $ref: '#/components/schemas/DecisionId'
        memberId: { type: string }
        memberType:
          type: string
          enum: [identityProvider, relyingParty]
        action:
          type: string
          enum: [certify, suspend, admit]
        reason: { type: string }
        rulebookVersion: { type: string }
        decidedAt: { type: string, format: date-time }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
    MembershipDecisionCreate:
      type: object
      required: [reason]
      properties:
        reason: { type: string }
        rulebookVersion: { type: string }
"""
    + envelope_block("IdentityProvider", "IdentityProvider", "IdentityProviderListResponse")
    + envelope_block("RelyingParty", "RelyingParty", "RelyingPartyListResponse")
    + envelope_block("MembershipDecision", "MembershipDecision", "MembershipDecisionListResponse"),
)

print("directory done")

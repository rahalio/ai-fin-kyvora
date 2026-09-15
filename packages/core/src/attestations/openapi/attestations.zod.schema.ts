import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const requestAttestation_Body = z
  .object({
    subjectId: z.string(),
    relyingPartyId: z.string(),
    identityProviderId: z.string().optional(),
    purpose: z.string(),
    requiredAssuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
    attributeNames: z.array(z.string()),
    consentId: z.string().optional(),
  })
  .passthrough();
const issueAttestation_Body = z
  .object({
    liability: z
      .object({
        bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
        ruleRef: z.string(),
        notes: z.string().optional(),
      })
      .passthrough(),
    screeningSnapshotId: z.string(),
    consentId: z.string(),
    attributeNames: z.array(z.string()).optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const AttestationId = z.string();
const AssuranceLevel = z.enum(['IAL1', 'IAL2', 'IAL3']);
const LiabilityBearer = z.enum(['identityProvider', 'relyingParty', 'subject']);
const LiabilityAllocation = z
  .object({
    bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
    ruleRef: z.string(),
    notes: z.string().optional(),
  })
  .passthrough();
const Attestation = z
  .object({
    attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectId: z.string(),
    identityProviderId: z.string(),
    relyingPartyId: z.string(),
    purpose: z.string().optional(),
    attributeNames: z.array(z.string()).optional(),
    assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
    status: z.enum([
      'pending',
      'issued',
      'refused',
      'expired',
      'revoked',
      'disputed',
    ]),
    liability: z
      .object({
        bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
        ruleRef: z.string(),
        notes: z.string().optional(),
      })
      .passthrough(),
    screeningSnapshotId: z.string().optional(),
    consentId: z.string().optional(),
    issuedAt: z.string().datetime({ offset: true }).optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    refuseReason: z.string().optional(),
    documentRecollectExceptionReason: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const AttestationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
              subjectId: z.string(),
              identityProviderId: z.string(),
              relyingPartyId: z.string(),
              purpose: z.string().optional(),
              attributeNames: z.array(z.string()).optional(),
              assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
              status: z.enum([
                'pending',
                'issued',
                'refused',
                'expired',
                'revoked',
                'disputed',
              ]),
              liability: z
                .object({
                  bearer: z.enum([
                    'identityProvider',
                    'relyingParty',
                    'subject',
                  ]),
                  ruleRef: z.string(),
                  notes: z.string().optional(),
                })
                .passthrough(),
              screeningSnapshotId: z.string().optional(),
              consentId: z.string().optional(),
              issuedAt: z.string().datetime({ offset: true }).optional(),
              expiresAt: z.string().datetime({ offset: true }).optional(),
              refuseReason: z.string().optional(),
              documentRecollectExceptionReason: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AttestationRequest = z
  .object({
    subjectId: z.string(),
    relyingPartyId: z.string(),
    identityProviderId: z.string().optional(),
    purpose: z.string(),
    requiredAssuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
    attributeNames: z.array(z.string()),
    consentId: z.string().optional(),
  })
  .passthrough();
const AttestationResponse = z
  .object({
    data: z
      .object({
        attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
        subjectId: z.string(),
        identityProviderId: z.string(),
        relyingPartyId: z.string(),
        purpose: z.string().optional(),
        attributeNames: z.array(z.string()).optional(),
        assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
        status: z.enum([
          'pending',
          'issued',
          'refused',
          'expired',
          'revoked',
          'disputed',
        ]),
        liability: z
          .object({
            bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
            ruleRef: z.string(),
            notes: z.string().optional(),
          })
          .passthrough(),
        screeningSnapshotId: z.string().optional(),
        consentId: z.string().optional(),
        issuedAt: z.string().datetime({ offset: true }).optional(),
        expiresAt: z.string().datetime({ offset: true }).optional(),
        refuseReason: z.string().optional(),
        documentRecollectExceptionReason: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AttestationIssue = z
  .object({
    liability: z
      .object({
        bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
        ruleRef: z.string(),
        notes: z.string().optional(),
      })
      .passthrough(),
    screeningSnapshotId: z.string(),
    consentId: z.string(),
    attributeNames: z.array(z.string()).optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AttestationRefuse = z.object({ refuseReason: z.string() }).passthrough();
const AttestationRevoke = z.object({ reason: z.string() }).passthrough();
const DocumentRecollectException = z
  .object({ reason: z.string() })
  .passthrough();

export const schemas: any = {
  requestAttestation_Body,
  issueAttestation_Body,
  Problem,
  AttestationId,
  AssuranceLevel,
  LiabilityBearer,
  LiabilityAllocation,
  Attestation,
  ResponseMeta,
  AttestationListResponse,
  AttestationRequest,
  AttestationResponse,
  AttestationIssue,
  AttestationRefuse,
  AttestationRevoke,
  DocumentRecollectException,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/attestations',
    alias: 'listAttestations',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum([
            'pending',
            'issued',
            'refused',
            'expired',
            'revoked',
            'disputed',
          ])
          .optional(),
      },
      {
        name: 'subjectId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'relyingPartyId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  attestationId: z
                    .string()
                    .regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
                  subjectId: z.string(),
                  identityProviderId: z.string(),
                  relyingPartyId: z.string(),
                  purpose: z.string().optional(),
                  attributeNames: z.array(z.string()).optional(),
                  assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
                  status: z.enum([
                    'pending',
                    'issued',
                    'refused',
                    'expired',
                    'revoked',
                    'disputed',
                  ]),
                  liability: z
                    .object({
                      bearer: z.enum([
                        'identityProvider',
                        'relyingParty',
                        'subject',
                      ]),
                      ruleRef: z.string(),
                      notes: z.string().optional(),
                    })
                    .passthrough(),
                  screeningSnapshotId: z.string().optional(),
                  consentId: z.string().optional(),
                  issuedAt: z.string().datetime({ offset: true }).optional(),
                  expiresAt: z.string().datetime({ offset: true }).optional(),
                  refuseReason: z.string().optional(),
                  documentRecollectExceptionReason: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/attestations',
    alias: 'requestAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestAttestation_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string(),
            identityProviderId: z.string(),
            relyingPartyId: z.string(),
            purpose: z.string().optional(),
            attributeNames: z.array(z.string()).optional(),
            assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
            status: z.enum([
              'pending',
              'issued',
              'refused',
              'expired',
              'revoked',
              'disputed',
            ]),
            liability: z
              .object({
                bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
                ruleRef: z.string(),
                notes: z.string().optional(),
              })
              .passthrough(),
            screeningSnapshotId: z.string().optional(),
            consentId: z.string().optional(),
            issuedAt: z.string().datetime({ offset: true }).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            refuseReason: z.string().optional(),
            documentRecollectExceptionReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/attestations/:attestationId',
    alias: 'getAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'attestationId',
        type: 'Path',
        schema: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string(),
            identityProviderId: z.string(),
            relyingPartyId: z.string(),
            purpose: z.string().optional(),
            attributeNames: z.array(z.string()).optional(),
            assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
            status: z.enum([
              'pending',
              'issued',
              'refused',
              'expired',
              'revoked',
              'disputed',
            ]),
            liability: z
              .object({
                bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
                ruleRef: z.string(),
                notes: z.string().optional(),
              })
              .passthrough(),
            screeningSnapshotId: z.string().optional(),
            consentId: z.string().optional(),
            issuedAt: z.string().datetime({ offset: true }).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            refuseReason: z.string().optional(),
            documentRecollectExceptionReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/attestations/:attestationId/document-recollect-exception',
    alias: 'recordDocumentRecollectException',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string() }).passthrough(),
      },
      {
        name: 'attestationId',
        type: 'Path',
        schema: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string(),
            identityProviderId: z.string(),
            relyingPartyId: z.string(),
            purpose: z.string().optional(),
            attributeNames: z.array(z.string()).optional(),
            assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
            status: z.enum([
              'pending',
              'issued',
              'refused',
              'expired',
              'revoked',
              'disputed',
            ]),
            liability: z
              .object({
                bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
                ruleRef: z.string(),
                notes: z.string().optional(),
              })
              .passthrough(),
            screeningSnapshotId: z.string().optional(),
            consentId: z.string().optional(),
            issuedAt: z.string().datetime({ offset: true }).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            refuseReason: z.string().optional(),
            documentRecollectExceptionReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/attestations/:attestationId/issue',
    alias: 'issueAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: issueAttestation_Body,
      },
      {
        name: 'attestationId',
        type: 'Path',
        schema: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string(),
            identityProviderId: z.string(),
            relyingPartyId: z.string(),
            purpose: z.string().optional(),
            attributeNames: z.array(z.string()).optional(),
            assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
            status: z.enum([
              'pending',
              'issued',
              'refused',
              'expired',
              'revoked',
              'disputed',
            ]),
            liability: z
              .object({
                bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
                ruleRef: z.string(),
                notes: z.string().optional(),
              })
              .passthrough(),
            screeningSnapshotId: z.string().optional(),
            consentId: z.string().optional(),
            issuedAt: z.string().datetime({ offset: true }).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            refuseReason: z.string().optional(),
            documentRecollectExceptionReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/attestations/:attestationId/refuse',
    alias: 'refuseAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ refuseReason: z.string() }).passthrough(),
      },
      {
        name: 'attestationId',
        type: 'Path',
        schema: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string(),
            identityProviderId: z.string(),
            relyingPartyId: z.string(),
            purpose: z.string().optional(),
            attributeNames: z.array(z.string()).optional(),
            assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
            status: z.enum([
              'pending',
              'issued',
              'refused',
              'expired',
              'revoked',
              'disputed',
            ]),
            liability: z
              .object({
                bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
                ruleRef: z.string(),
                notes: z.string().optional(),
              })
              .passthrough(),
            screeningSnapshotId: z.string().optional(),
            consentId: z.string().optional(),
            issuedAt: z.string().datetime({ offset: true }).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            refuseReason: z.string().optional(),
            documentRecollectExceptionReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/attestations/:attestationId/revoke',
    alias: 'revokeAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string() }).passthrough(),
      },
      {
        name: 'attestationId',
        type: 'Path',
        schema: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            attestationId: z.string().regex(/^att_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string(),
            identityProviderId: z.string(),
            relyingPartyId: z.string(),
            purpose: z.string().optional(),
            attributeNames: z.array(z.string()).optional(),
            assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
            status: z.enum([
              'pending',
              'issued',
              'refused',
              'expired',
              'revoked',
              'disputed',
            ]),
            liability: z
              .object({
                bearer: z.enum(['identityProvider', 'relyingParty', 'subject']),
                ruleRef: z.string(),
                notes: z.string().optional(),
              })
              .passthrough(),
            screeningSnapshotId: z.string().optional(),
            consentId: z.string().optional(),
            issuedAt: z.string().datetime({ offset: true }).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            refuseReason: z.string().optional(),
            documentRecollectExceptionReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}

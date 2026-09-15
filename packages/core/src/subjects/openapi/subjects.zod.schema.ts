import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createSubject_Body = z
  .object({
    subjectType: z.enum(['individual', 'legalEntity']),
    displayRef: z.string().optional(),
    inclusionTier: z.enum(['standard', 'alternativeEvidence']).optional(),
  })
  .passthrough();
const updateSubject_Body = z
  .object({
    displayRef: z.string(),
    inclusionTier: z.enum(['standard', 'alternativeEvidence']),
  })
  .partial()
  .passthrough();
const registerSubjectAttribute_Body = z
  .object({
    name: z.string(),
    value: z.string(),
    assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    source: z.string().optional(),
  })
  .passthrough();
const createLegalEntityLink_Body = z
  .object({
    individualSubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    legalEntitySubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    role: z.enum(['director', 'ubo', 'signatory']),
  })
  .passthrough();
const createRefreshCycle_Body = z
  .object({
    subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    dueAt: z.string().datetime({ offset: true }),
    changeSignals: z.array(z.string()).optional(),
  })
  .passthrough();
const completeRefreshCycle_Body = z
  .object({ status: z.enum(['completed', 'overdue']) })
  .partial()
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
const SubjectId = z.string();
const IdentitySubject = z
  .object({
    subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectType: z.enum(['individual', 'legalEntity']),
    displayRef: z.string().optional(),
    inclusionTier: z.enum(['standard', 'alternativeEvidence']).optional(),
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
const IdentitySubjectListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
              subjectType: z.enum(['individual', 'legalEntity']),
              displayRef: z.string().optional(),
              inclusionTier: z
                .enum(['standard', 'alternativeEvidence'])
                .optional(),
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
const IdentitySubjectCreate = z
  .object({
    subjectType: z.enum(['individual', 'legalEntity']),
    displayRef: z.string().optional(),
    inclusionTier: z.enum(['standard', 'alternativeEvidence']).optional(),
  })
  .passthrough();
const IdentitySubjectResponse = z
  .object({
    data: z
      .object({
        subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
        subjectType: z.enum(['individual', 'legalEntity']),
        displayRef: z.string().optional(),
        inclusionTier: z.enum(['standard', 'alternativeEvidence']).optional(),
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
const IdentitySubjectUpdate = z
  .object({
    displayRef: z.string(),
    inclusionTier: z.enum(['standard', 'alternativeEvidence']),
  })
  .partial()
  .passthrough();
const AttributeId = z.string();
const AssuranceLevel = z.enum(['IAL1', 'IAL2', 'IAL3']);
const AttributeRecord = z
  .object({
    attributeId: z.string().regex(/^atr_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    valueHash: z.string().optional(),
    assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
    verifiedAt: z.string().datetime({ offset: true }),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    source: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AttributeRecordListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              attributeId: z.string().regex(/^atr_[0-9A-HJKMNP-TV-Z]{26}$/),
              subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              valueHash: z.string().optional(),
              assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
              verifiedAt: z.string().datetime({ offset: true }),
              expiresAt: z.string().datetime({ offset: true }).optional(),
              source: z.string().optional(),
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
const AttributeRecordCreate = z
  .object({
    name: z.string(),
    value: z.string(),
    assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    source: z.string().optional(),
  })
  .passthrough();
const AttributeRecordResponse = z
  .object({
    data: z
      .object({
        attributeId: z.string().regex(/^atr_[0-9A-HJKMNP-TV-Z]{26}$/),
        subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        valueHash: z.string().optional(),
        assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
        verifiedAt: z.string().datetime({ offset: true }),
        expiresAt: z.string().datetime({ offset: true }).optional(),
        source: z.string().optional(),
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
const LinkId = z.string();
const LegalEntityLink = z
  .object({
    linkId: z.string().regex(/^lnk_[0-9A-HJKMNP-TV-Z]{26}$/),
    individualSubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    legalEntitySubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    role: z.enum(['director', 'ubo', 'signatory']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LegalEntityLinkListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              linkId: z.string().regex(/^lnk_[0-9A-HJKMNP-TV-Z]{26}$/),
              individualSubjectId: z
                .string()
                .regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
              legalEntitySubjectId: z
                .string()
                .regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
              role: z.enum(['director', 'ubo', 'signatory']),
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
const LegalEntityLinkCreate = z
  .object({
    individualSubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    legalEntitySubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    role: z.enum(['director', 'ubo', 'signatory']),
  })
  .passthrough();
const LegalEntityLinkResponse = z
  .object({
    data: z
      .object({
        linkId: z.string().regex(/^lnk_[0-9A-HJKMNP-TV-Z]{26}$/),
        individualSubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
        legalEntitySubjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
        role: z.enum(['director', 'ubo', 'signatory']),
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
const CycleId = z.string();
const RefreshCycle = z
  .object({
    cycleId: z.string().regex(/^rfr_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    dueAt: z.string().datetime({ offset: true }),
    status: z.enum(['scheduled', 'completed', 'overdue']),
    changeSignals: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const RefreshCycleListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              cycleId: z.string().regex(/^rfr_[0-9A-HJKMNP-TV-Z]{26}$/),
              subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
              dueAt: z.string().datetime({ offset: true }),
              status: z.enum(['scheduled', 'completed', 'overdue']),
              changeSignals: z.array(z.string()).optional(),
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
const RefreshCycleCreate = z
  .object({
    subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
    dueAt: z.string().datetime({ offset: true }),
    changeSignals: z.array(z.string()).optional(),
  })
  .passthrough();
const RefreshCycleResponse = z
  .object({
    data: z
      .object({
        cycleId: z.string().regex(/^rfr_[0-9A-HJKMNP-TV-Z]{26}$/),
        subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
        dueAt: z.string().datetime({ offset: true }),
        status: z.enum(['scheduled', 'completed', 'overdue']),
        changeSignals: z.array(z.string()).optional(),
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
const RefreshCycleComplete = z
  .object({ status: z.enum(['completed', 'overdue']) })
  .partial()
  .passthrough();

export const schemas: any = {
  createSubject_Body,
  updateSubject_Body,
  registerSubjectAttribute_Body,
  createLegalEntityLink_Body,
  createRefreshCycle_Body,
  completeRefreshCycle_Body,
  Problem,
  SubjectId,
  IdentitySubject,
  ResponseMeta,
  IdentitySubjectListResponse,
  IdentitySubjectCreate,
  IdentitySubjectResponse,
  IdentitySubjectUpdate,
  AttributeId,
  AssuranceLevel,
  AttributeRecord,
  AttributeRecordListResponse,
  AttributeRecordCreate,
  AttributeRecordResponse,
  LinkId,
  LegalEntityLink,
  LegalEntityLinkListResponse,
  LegalEntityLinkCreate,
  LegalEntityLinkResponse,
  CycleId,
  RefreshCycle,
  RefreshCycleListResponse,
  RefreshCycleCreate,
  RefreshCycleResponse,
  RefreshCycleComplete,
};

const endpoints = makeApi([
  {
    method: 'delete',
    path: '/v1/legal-entity-links/:linkId',
    alias: 'unlinkLegalEntity',
    requestFormat: 'json',
    parameters: [
      {
        name: 'linkId',
        type: 'Path',
        schema: z.string().regex(/^lnk_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z.void(),
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
    method: 'get',
    path: '/v1/refresh-cycles',
    alias: 'listRefreshCycles',
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
        schema: z.enum(['scheduled', 'completed', 'overdue']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  cycleId: z.string().regex(/^rfr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dueAt: z.string().datetime({ offset: true }),
                  status: z.enum(['scheduled', 'completed', 'overdue']),
                  changeSignals: z.array(z.string()).optional(),
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
    path: '/v1/refresh-cycles',
    alias: 'createRefreshCycle',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRefreshCycle_Body,
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
            cycleId: z.string().regex(/^rfr_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            dueAt: z.string().datetime({ offset: true }),
            status: z.enum(['scheduled', 'completed', 'overdue']),
            changeSignals: z.array(z.string()).optional(),
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
    method: 'post',
    path: '/v1/refresh-cycles/:cycleId/complete',
    alias: 'completeRefreshCycle',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: completeRefreshCycle_Body,
      },
      {
        name: 'cycleId',
        type: 'Path',
        schema: z.string().regex(/^rfr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            cycleId: z.string().regex(/^rfr_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            dueAt: z.string().datetime({ offset: true }),
            status: z.enum(['scheduled', 'completed', 'overdue']),
            changeSignals: z.array(z.string()).optional(),
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
    method: 'get',
    path: '/v1/subjects',
    alias: 'listSubjects',
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
        name: 'subjectType',
        type: 'Query',
        schema: z.enum(['individual', 'legalEntity']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
                  subjectType: z.enum(['individual', 'legalEntity']),
                  displayRef: z.string().optional(),
                  inclusionTier: z
                    .enum(['standard', 'alternativeEvidence'])
                    .optional(),
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
    path: '/v1/subjects',
    alias: 'createSubject',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createSubject_Body,
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
            subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectType: z.enum(['individual', 'legalEntity']),
            displayRef: z.string().optional(),
            inclusionTier: z
              .enum(['standard', 'alternativeEvidence'])
              .optional(),
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
    path: '/v1/subjects/:subjectId',
    alias: 'getSubject',
    requestFormat: 'json',
    parameters: [
      {
        name: 'subjectId',
        type: 'Path',
        schema: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectType: z.enum(['individual', 'legalEntity']),
            displayRef: z.string().optional(),
            inclusionTier: z
              .enum(['standard', 'alternativeEvidence'])
              .optional(),
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
    method: 'patch',
    path: '/v1/subjects/:subjectId',
    alias: 'updateSubject',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateSubject_Body,
      },
      {
        name: 'subjectId',
        type: 'Path',
        schema: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectType: z.enum(['individual', 'legalEntity']),
            displayRef: z.string().optional(),
            inclusionTier: z
              .enum(['standard', 'alternativeEvidence'])
              .optional(),
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
    method: 'get',
    path: '/v1/subjects/:subjectId/attributes',
    alias: 'listSubjectAttributes',
    requestFormat: 'json',
    parameters: [
      {
        name: 'subjectId',
        type: 'Path',
        schema: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  attributeId: z.string().regex(/^atr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  valueHash: z.string().optional(),
                  assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
                  verifiedAt: z.string().datetime({ offset: true }),
                  expiresAt: z.string().datetime({ offset: true }).optional(),
                  source: z.string().optional(),
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
    path: '/v1/subjects/:subjectId/attributes',
    alias: 'registerSubjectAttribute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerSubjectAttribute_Body,
      },
      {
        name: 'subjectId',
        type: 'Path',
        schema: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            attributeId: z.string().regex(/^atr_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectId: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            valueHash: z.string().optional(),
            assuranceLevel: z.enum(['IAL1', 'IAL2', 'IAL3']),
            verifiedAt: z.string().datetime({ offset: true }),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            source: z.string().optional(),
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
    method: 'get',
    path: '/v1/subjects/:subjectId/legal-entity-links',
    alias: 'listLegalEntityLinks',
    requestFormat: 'json',
    parameters: [
      {
        name: 'subjectId',
        type: 'Path',
        schema: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  linkId: z.string().regex(/^lnk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  individualSubjectId: z
                    .string()
                    .regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
                  legalEntitySubjectId: z
                    .string()
                    .regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
                  role: z.enum(['director', 'ubo', 'signatory']),
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
    path: '/v1/subjects/:subjectId/legal-entity-links',
    alias: 'createLegalEntityLink',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createLegalEntityLink_Body,
      },
      {
        name: 'subjectId',
        type: 'Path',
        schema: z.string().regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            linkId: z.string().regex(/^lnk_[0-9A-HJKMNP-TV-Z]{26}$/),
            individualSubjectId: z
              .string()
              .regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            legalEntitySubjectId: z
              .string()
              .regex(/^sub_[0-9A-HJKMNP-TV-Z]{26}$/),
            role: z.enum(['director', 'ubo', 'signatory']),
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

import { LIMIT_PATTERN, PAGE_PATTERN } from '#consts/pagination'
import type { JSONSchemaType } from 'ajv'

export interface PaginationQueryParams {
  limit?: string
  page?: string
}

export const paginationQueryProperties = {
  limit: {
    type: 'string',
    pattern: LIMIT_PATTERN,
    nullable: true
  },
  page: {
    type: 'string',
    pattern: PAGE_PATTERN,
    nullable: true
  }
} as const

export const paginationQuerySchema: JSONSchemaType<PaginationQueryParams> = {
  type: 'object',
  additionalProperties: false,
  properties: paginationQueryProperties
}

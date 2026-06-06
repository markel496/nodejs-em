import type { JSONSchemaType } from 'ajv'

export type IdParams = {
  id: string
}

const ID_PATTERN = '^[1-9]\\d*$'

export const idParamsSchema: JSONSchemaType<IdParams> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      pattern: ID_PATTERN
    }
  },
  required: ['id']
}

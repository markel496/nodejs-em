import { UserRole } from '@prisma/client'

import { BaseController } from '#classes/BaseController'
import { getPagination } from '#helpers/getPagination'
import { paginationQueryProperties } from '#schemas/query/pagination'

import { getUsersService } from '../services/getUsers.js'

import type { Request } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { UsersQueryParams } from '../types/requests.js'

class GetUsersController extends BaseController<
  ParamsDictionary,
  UsersQueryParams
> {
  protected override get querySchema(): JSONSchemaType<UsersQueryParams> {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        ...paginationQueryProperties,
        role: {
          type: 'string',
          enum: [UserRole.student, UserRole.mentor, UserRole.admin],
          nullable: true
        }
      }
    }
  }

  protected override async controller(
    req: Request<{}, unknown, {}, UsersQueryParams>
  ) {
    const { role } = req.query

    const { limit, offset } = getPagination(req.query)

    const users = await getUsersService({
      limit,
      offset,
      role: role || undefined
    })

    return users
  }
}

export default new GetUsersController()

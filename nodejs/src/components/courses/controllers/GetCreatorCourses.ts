import { BaseController } from '#classes/BaseController'
import { getPagination } from '#helpers/getPagination'
import {
  paginationQuerySchema,
  type PaginationQueryParams
} from '#schemas/query/pagination'
import { idParamsSchema, type IdParams } from '#schemas/params/idParams'

import { getCreatorCoursesService } from '../services/getCreatorCourses.js'

import type { Request } from 'express'

class GetCreatorCoursesController extends BaseController<
  IdParams,
  PaginationQueryParams
> {
  protected override get paramsSchema() {
    return idParamsSchema
  }

  protected override get querySchema() {
    return paginationQuerySchema
  }

  protected override async controller(
    req: Request<IdParams, unknown, {}, PaginationQueryParams>
  ) {
    const { id } = req.params
    const { limit, offset } = getPagination(req.query)

    const courses = await getCreatorCoursesService({
      creatorId: Number(id),
      limit,
      offset
    })

    return courses
  }
}

export default new GetCreatorCoursesController()

import { BaseController } from '#classes/BaseController'
import { getPagination } from '#helpers/getPagination'
import {
  paginationQuerySchema,
  type PaginationQueryParams
} from '#schemas/query/pagination'

import { getAllCoursesService } from '../services/getAllCourses.js'

import type { Request } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'

class GetAllCoursesController extends BaseController<
  ParamsDictionary,
  PaginationQueryParams
> {
  protected override get querySchema() {
    return paginationQuerySchema
  }

  protected override async controller(
    req: Request<{}, unknown, {}, PaginationQueryParams>
  ) {
    const { limit, offset } = getPagination(req.query)

    const courses = await getAllCoursesService({ limit, offset })

    return courses
  }
}

export default new GetAllCoursesController()

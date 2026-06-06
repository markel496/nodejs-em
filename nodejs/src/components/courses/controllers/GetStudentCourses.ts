import { BaseController } from '#classes/BaseController'
import { getAuthUser } from '#helpers/getAuthUser'
import { getPagination } from '#helpers/getPagination'
import {
  paginationQuerySchema,
  type PaginationQueryParams
} from '#schemas/query/pagination'
import { idParamsSchema, type IdParams } from '#schemas/params/idParams'

import { getStudentCoursesService } from '../services/getStudentCourses.js'

import type { Request } from 'express'

class GetStudentCoursesController extends BaseController<
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
    const { limit, offset } = getPagination(req.query)
    const { id } = req.params
    const { id: userId, role } = getAuthUser(req)

    const courses = await getStudentCoursesService({
      userId,
      role,
      studentId: Number(id),
      limit,
      offset
    })

    return courses
  }
}

export default new GetStudentCoursesController()

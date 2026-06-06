import { UserRole } from '@prisma/client'
import { BaseController } from '#classes/BaseController'
import { getAuthUser } from '#helpers/getAuthUser'
import { idParamsSchema, type IdParams } from '#schemas/params/idParams.js'

import { getCourseService } from '../services/getCourse.js'
import { checkCourseAccessService } from '../services/checkCourseAccessService.js'

import type { Request } from 'express'

class GetCourseController extends BaseController {
  protected override get paramsSchema() {
    return idParamsSchema
  }

  protected override async controller(req: Request<IdParams>) {
    const { id } = req.params

    const { id: userId, role } = getAuthUser(req)

    const courseId = Number(id)

    if (role === UserRole.student) {
      await checkCourseAccessService(courseId, userId)
    }

    const course = await getCourseService(courseId)

    return course
  }
}

export default new GetCourseController()

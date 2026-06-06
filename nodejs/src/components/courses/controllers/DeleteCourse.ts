import { BaseController } from '#classes/BaseController'
import { idParamsSchema, type IdParams } from '#schemas/params/idParams'

import { deleteCourseService } from '../services/deleteCourse.js'

import type { Request } from 'express'

class DeleteCourseController extends BaseController {
  protected override get paramsSchema() {
    return idParamsSchema
  }

  protected override async controller(req: Request<IdParams>) {
    const { id } = req.params

    const result = await deleteCourseService(Number(id))

    return { success: true, ...result }
  }
}

export default new DeleteCourseController()

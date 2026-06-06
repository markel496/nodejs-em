import { BaseController } from '#classes/BaseController'
import { idParamsSchema, type IdParams } from '#schemas/params/idParams.js'

import { updateCourseService } from '../services/updateCourse.js'

import type { Request } from 'express'
import type { Query } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { UpdateCourseRequestBody } from '../types/requests.js'

class UpdateCourseController extends BaseController<
  IdParams,
  Query,
  UpdateCourseRequestBody
> {
  protected override get paramsSchema() {
    return idParamsSchema
  }

  protected override get bodySchema(): JSONSchemaType<UpdateCourseRequestBody> {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        title: { type: 'string', minLength: 3, nullable: true },
        description: { type: 'string', minLength: 3, nullable: true }
      },
      // Должно быть передано хотя бы одно поле
      anyOf: [{ required: ['title'] }, { required: ['description'] }]
    }
  }

  protected override async controller(
    req: Request<IdParams, unknown, UpdateCourseRequestBody>
  ) {
    const { id: courseId } = req.params
    const { title, description } = req.body

    const updated = await updateCourseService({
      id: Number(courseId),
      title,
      description
    })

    return { success: true, data: updated }
  }
}

export default new UpdateCourseController()

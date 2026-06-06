import { BaseController } from '#classes/BaseController'
import { idParamsSchema, type IdParams } from '#schemas/params/idParams'

import { enrollStudentService } from '../services/enrollStudent.js'

import type { Request } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { EnrollStudentRequestBody } from '../types/requests.js'

class EnrollStudentController extends BaseController<
  ParamsDictionary,
  Query,
  EnrollStudentRequestBody
> {
  protected override get bodySchema(): JSONSchemaType<EnrollStudentRequestBody> {
    return {
      type: 'object',
      required: ['studentId'],
      additionalProperties: false,
      properties: {
        studentId: {
          type: 'integer',
          minimum: 1
        }
      }
    }
  }

  protected override get paramsSchema() {
    return idParamsSchema
  }

  protected override async controller(
    req: Request<IdParams, unknown, EnrollStudentRequestBody>
  ) {
    const { id: courseId } = req.params
    const { studentId } = req.body

    const result = await enrollStudentService({
      courseId: Number(courseId),
      studentId
    })

    return { success: true, ...result }
  }
}

export default new EnrollStudentController()

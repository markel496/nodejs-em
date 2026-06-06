import { BaseController } from '#classes/BaseController'
import { getAuthUser } from '#helpers/getAuthUser'

import { createCourseService } from '../services/createCourse.js'

import type { Request } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { CreateCourseRequestBody } from '../types/requests.js'

class CreateCourseController extends BaseController<
  ParamsDictionary,
  Query,
  CreateCourseRequestBody
> {
  protected override get bodySchema(): JSONSchemaType<CreateCourseRequestBody> {
    return {
      type: 'object',
      required: ['title'],
      additionalProperties: false,
      properties: {
        title: { type: 'string', minLength: 3 },
        description: { type: 'string', minLength: 3, nullable: true }
      }
    }
  }

  protected override async controller(
    req: Request<{}, unknown, CreateCourseRequestBody>
  ) {
    const { title, description } = req.body
    const { id: creatorId } = getAuthUser(req)

    const result = await createCourseService({
      title,
      description,
      creatorId
    })

    return { success: true, data: result }
  }
}

export default new CreateCourseController()

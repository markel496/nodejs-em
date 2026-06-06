import { BaseController } from '#classes/BaseController'
import { idParamsSchema, type IdParams } from '#schemas/params/idParams'

import { updateUserService } from '../services/updateUser.js'

import type { Request } from 'express'
import type { Query } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { UpdateUserRequestBody } from '../types/requests.js'

class UpdateUserController extends BaseController<
  IdParams,
  Query,
  UpdateUserRequestBody
> {
  protected override get paramsSchema() {
    return idParamsSchema
  }

  protected override get bodySchema(): JSONSchemaType<UpdateUserRequestBody> {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', minLength: 2, nullable: true },
        surname: { type: 'string', minLength: 2, nullable: true },
        age: { type: 'number', nullable: true },
        email: { type: 'string', format: 'email', nullable: true }
      },
      // Должно быть передано хотя бы одно поле
      anyOf: [
        { required: ['name'] },
        { required: ['surname'] },
        { required: ['age'] },
        { required: ['email'] }
      ]
    }
  }

  async controller(req: Request<IdParams, unknown, UpdateUserRequestBody>) {
    const { id: userId } = req.params
    const { name, surname, age, email } = req.body

    const updated = await updateUserService({
      id: Number(userId),
      name,
      surname,
      age,
      email
    })

    return { success: true, data: updated }
  }
}

export default new UpdateUserController()

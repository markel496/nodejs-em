import { BaseController } from '#classes/BaseController'

import { createUserService } from '../services/createUser.js'

import type { Request } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { CreateUserRequestBody } from '../types/requests.js'

class CreateUserController extends BaseController<
  ParamsDictionary,
  Query,
  CreateUserRequestBody
> {
  protected override get bodySchema(): JSONSchemaType<CreateUserRequestBody> {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', minLength: 2 },
        surname: { type: 'string', minLength: 2 },
        age: { type: 'number', nullable: true },
        email: { type: 'string', format: 'email' },
        password: {
          type: 'string',
          pattern:
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        }
      },
      required: ['name', 'surname', 'password', 'email']
    }
  }

  protected override async controller(
    req: Request<{}, unknown, CreateUserRequestBody>
  ) {
    const { name, surname, age, password, email } = req.body

    const result = await createUserService({
      name,
      surname,
      age,
      password,
      email
    })

    return { success: true, data: result }
  }
}

export default new CreateUserController()

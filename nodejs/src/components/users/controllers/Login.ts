import { BaseController } from '#classes/BaseController'
import { getTokensService } from '../services/getTokens.js'
import { getUserByEmailAndPasswordService } from '../services/getUserByEmailAndPassword.js'

import type { Request } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { LoginRequestBody } from '../types/requests.js'
import type { UserSession } from '../types/session.js'

class LoginController extends BaseController<
  ParamsDictionary,
  Query,
  LoginRequestBody
> {
  protected override get bodySchema(): JSONSchemaType<LoginRequestBody> {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      },
      required: ['email', 'password']
    }
  }

  protected override async controller(
    req: Request<{}, unknown, LoginRequestBody>
  ) {
    const { email, password } = req.body

    const user = await getUserByEmailAndPasswordService({ email, password })

    const session: UserSession = {
      id: user.id,
      name: user.name,
      surname: user.surname || undefined,
      email: user.email || undefined,
      role: user.role
    }

    const tokens = await getTokensService(session)

    return tokens
  }
}

export default new LoginController()

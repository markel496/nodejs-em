import { BaseController } from '#classes/BaseController'
import { getUserByRefreshTokenService } from '../services/getUserByRefreshToken.js'
import { getTokensService } from '../services/getTokens.js'
import { removeUserActiveSession } from '../services/removeUserActiveSession.js'

import type { Request } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import type { JSONSchemaType } from 'ajv'
import type { UserSession } from '../types/session.js'
import type { TRefreshToken } from '../types/requests.js'

class RefreshController extends BaseController<
  ParamsDictionary,
  Query,
  TRefreshToken
> {
  protected override get bodySchema(): JSONSchemaType<TRefreshToken> {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        refreshToken: { type: 'string', minLength: 1 }
      },
      required: ['refreshToken']
    }
  }

  protected override async controller(
    req: Request<{}, unknown, TRefreshToken>
  ) {
    const { refreshToken } = req.body

    const user = await getUserByRefreshTokenService(refreshToken)

    await removeUserActiveSession(user.id)

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

export default new RefreshController()

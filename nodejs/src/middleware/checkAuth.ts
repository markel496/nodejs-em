import config from 'config'
import jwt from 'jsonwebtoken'
import { AuthorizationError } from '#errors'
import { getSessionByToken } from '#components/users/services/getSessionByToken'

import type { RequestHandler } from 'express'

export const checkAuth: RequestHandler = async (req, _res, next) => {
  const { authorization } = req.headers

  try {
    if (!authorization) {
      throw new Error('Authorization header is missing')
    }

    const key = config.get<string>('auth.token_key')

    jwt.verify(authorization, key)

    const session = await getSessionByToken(authorization)

    if (!session) {
      throw new Error('Session not found')
    }

    req.state = { user: session }
    next()
  } catch (error) {
    let code = 'INVALID_TOKEN'
    let message = 'Authorization error'

    if (error instanceof jwt.TokenExpiredError) {
      code = 'TOKEN_EXPIRED'
      message = 'Token expired'
    } else if (error instanceof jwt.JsonWebTokenError) {
      code = 'INVALID_TOKEN'
      message = 'Invalid token'
    } else if (error instanceof Error) {
      message = error.message
    }

    next(
      new AuthorizationError({
        code,
        text: message
      })
    )
    return
  }
}

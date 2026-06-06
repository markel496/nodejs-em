import { prisma } from '#libs/prisma'
import config from 'config'
import jwt from 'jsonwebtoken'
import { AuthorizationError } from '#errors'

export const getUserByRefreshTokenService = async (refreshToken: string) => {
  try {
    const key = config.get<string>('auth.refresh_token_key')
    jwt.verify(refreshToken, key)
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

    throw new AuthorizationError({
      code,
      text: message
    })
  }

  const user = await prisma.user.findFirst({
    where: { refreshToken },
    omit: { password: true }
  })

  if (!user) {
    throw new AuthorizationError({
      code: 'INVALID_TOKEN',
      text: 'Токен не валидный'
    })
  }

  return user
}

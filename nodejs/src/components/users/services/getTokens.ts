import config from 'config'
import jwt from 'jsonwebtoken'
import { prisma, Prisma } from '#libs/prisma'
import redis from '#libs/redis'
import { NotFoundError } from '#errors'

import type { UserSession } from '../types/session.js'

export const getTokensService = async (session: UserSession) => {
  const key = config.get<string>('auth.token_key')
  const refreshKey = config.get<string>('auth.refresh_token_key')

  const token = jwt.sign(session, key, {
    expiresIn: '7d'
  })
  const refreshToken = jwt.sign(session, refreshKey, {
    expiresIn: '30d'
  })

  const userId = session.id

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken }
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND',
        text: `User with id=${userId} not found`
      })
    }
    throw error
  }

  const ACCESS_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7

  await redis.set(
    `access_token:${token}`,
    JSON.stringify(session),
    'EX',
    ACCESS_TOKEN_TTL_SECONDS
  )
  await redis.set(
    `user_session:${userId}`,
    `access_token:${token}`,
    'EX',
    ACCESS_TOKEN_TTL_SECONDS
  )

  return { token, refreshToken }
}

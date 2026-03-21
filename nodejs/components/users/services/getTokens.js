const config = require('config')
const jwt = require('jsonwebtoken')
const { addDays } = require('date-fns')
const { prisma, Prisma } = require('#libs/prisma')
const redis = require('#libs/redis')

const getTokens = async (session) => {
  const now = new Date()

  const key = config.get('auth.token_key')

  const tokensData = {
    ...session,
    expire: addDays(now, 7)
  }

  const refreshTokensData = {
    ...session,
    expire: addDays(now, 30)
  }

  const token = jwt.sign(tokensData, key)
  const refreshToken = jwt.sign(refreshTokensData, key)

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

  await redis.set(`access_token:${token}`, JSON.stringify(tokensData))
  await redis.set(`user_session:${userId}`, `access_token:${token}`)

  return { token, refreshToken }
}

module.exports = getTokens

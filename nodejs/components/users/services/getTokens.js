const config = require('config')
const jwt = require('jsonwebtoken')
const { addDays } = require('date-fns')
const db = require('#libs/database')
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

  await db.none('UPDATE users SET refresh_token = $1 WHERE id = $2', [
    refreshToken,
    userId
  ])
  await redis.set(`access_token:${token}`, JSON.stringify(tokensData))
  await redis.set(`user_session:${userId}`, `access_token:${token}`)

  return { token, refreshToken }
}

module.exports = getTokens

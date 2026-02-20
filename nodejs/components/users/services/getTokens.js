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

  await db.none('UPDATE users SET refresh_token = $1 WHERE id = $2', [
    refreshToken,
    session.id
  ])
  await redis.set(`token_${token}`, JSON.stringify(tokensData))

  return { token, refreshToken }
}

module.exports = getTokens

const redis = require('#libs/redis')

const getSessionByToken = async (token) => {
  const result = await redis.get(`token_${token}`)
  return result ? JSON.parse(result) : null
}

module.exports = getSessionByToken

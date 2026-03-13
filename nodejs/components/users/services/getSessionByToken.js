const redis = require('#libs/redis')

const getSessionByToken = async (token) => {
  const result = await redis.get(`access_token:${token}`)
  return result ? JSON.parse(result) : null
}

module.exports = getSessionByToken

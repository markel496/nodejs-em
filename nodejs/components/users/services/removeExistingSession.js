const redis = require('#libs/redis')

async function removeExistingSession(userId) {
  const token = await redis.get(`user_session:${userId}`)
  if (!token) return
  await redis.del(token)
  await redis.del(`user_session:${userId}`)
}

module.exports = removeExistingSession

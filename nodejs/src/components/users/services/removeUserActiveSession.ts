import redis from '#libs/redis'

export async function removeUserActiveSession(userId: number) {
  const token = await redis.get(`user_session:${userId}`)
  if (!token) return
  await redis.del(token)
  await redis.del(`user_session:${userId}`)
}

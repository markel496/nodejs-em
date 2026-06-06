import redis from '#libs/redis'

import type { UserSession } from '../types/session.js'

type GetSessionByToken = (token: string) => Promise<UserSession | null>

export const getSessionByToken: GetSessionByToken = async (token) => {
  const result = await redis.get(`access_token:${token}`)

  if (!result) return null

  const session: UserSession = JSON.parse(result)
  return session
}

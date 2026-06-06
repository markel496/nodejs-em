import type { UserSession } from '#components/users/types/session'

declare global {
  namespace Express {
    interface Request {
      state?: {
        user: UserSession
      }
    }
  }
}

export {}

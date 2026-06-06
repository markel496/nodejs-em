import { UserRole } from '@prisma/client'
import { ForbiddenError } from '#errors'
import { getAuthUser } from '#helpers/getAuthUser'

import type { RequestHandler } from 'express'

const ROLES = {
  [UserRole.student]: 1,
  [UserRole.mentor]: 2,
  [UserRole.admin]: 3
} as const satisfies Record<UserRole, number>

export const checkRole = (requiredRole: UserRole): RequestHandler => {
  return (req, _res, next) => {
    const { role: userRole } = getAuthUser(req)

    if (!userRole || ROLES[userRole] < ROLES[requiredRole]) {
      next(new ForbiddenError())
      return
    }
    next()
  }
}

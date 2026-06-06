import { prisma } from '#libs/prisma'

import type { GetUsersOptions } from '../types/requests.js'

export const getUsersService = async ({
  limit,
  offset,
  role
}: GetUsersOptions) => {
  const where = role ? { role } : undefined

  const users = await prisma.user.findMany({
    where,
    orderBy: { id: 'asc' },
    take: limit,
    skip: offset,
    omit: { password: true, refreshToken: true }
  })

  return users
}

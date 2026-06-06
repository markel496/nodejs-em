import { prisma } from '#libs/prisma'
import { UserRole } from '@prisma/client'
import { NotFoundError } from '#errors'

import type { GetCreatorCoursesData } from '../types/requests.js'

export const getCreatorCoursesService = async ({
  creatorId,
  limit,
  offset
}: GetCreatorCoursesData) => {
  const creator = await prisma.user.findUnique({
    where: { id: creatorId },
    select: {
      id: true,
      role: true
    }
  })

  if (!creator || creator.role === UserRole.student) {
    throw new NotFoundError({
      code: 'CREATOR_NOT_FOUND',
      text: `Course creator with id=${creatorId} does not exist`
    })
  }

  const courses = await prisma.course.findMany({
    where: { creatorId },
    orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    take: limit,
    skip: offset,
    omit: { creatorId: true }
  })

  return courses
}

import { prisma, Prisma } from '#libs/prisma'
import { NotFoundError } from '#errors'

import type {
  UpdateCourseData,
  UpdateCourseRequestBody
} from '../types/requests.js'

export const updateCourseService = async ({
  id,
  title,
  description
}: UpdateCourseData) => {
  const data: UpdateCourseRequestBody = {}

  if (title) data.title = title
  if (description) data.description = description

  try {
    const updated = await prisma.course.update({
      where: { id },
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            surname: true,
            age: true,
            email: true,
            role: true
          }
        }
      },
      omit: { creatorId: true }
    })

    return updated
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundError({
        code: 'COURSE_NOT_FOUND',
        text: `Course with id=${id} not found`
      })
    }

    throw error
  }
}

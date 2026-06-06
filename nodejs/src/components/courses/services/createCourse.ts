import { prisma, Prisma } from '#libs/prisma'
import { ConflictError } from '#errors'

import type { CreateCourseData } from '../types/requests.js'

export const createCourseService = async (data: CreateCourseData) => {
  try {
    const newCourse = await prisma.course.create({ data })
    return newCourse
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictError({
        code: 'COURSE_TITLE_EXISTS',
        text: `Course with title '${data.title}' already exists`
      })
    }

    throw error
  }
}

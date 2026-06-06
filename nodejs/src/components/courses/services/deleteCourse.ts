import { prisma, Prisma } from '#libs/prisma'
import { NotFoundError } from '#errors'

export const deleteCourseService = async (id: number) => {
  try {
    await prisma.course.delete({
      where: { id }
    })

    return { message: `Course with id=${id} deleted successfully` }
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

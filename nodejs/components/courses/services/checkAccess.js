const { prisma, Prisma } = require('#libs/prisma')
const { ForbiddenError } = require('#errors')

const checkAccess = async (courseId, studentId) => {
  try {
    await prisma.courseStudent.findFirstOrThrow({
      where: { courseId, studentId }
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new ForbiddenError({
        code: 'COURSE_ACCESS_DENIED',
        text: 'Недостаточно прав для просмотра курса'
      })
    }

    throw error
  }
}

module.exports = checkAccess

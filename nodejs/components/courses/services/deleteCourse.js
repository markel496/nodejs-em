const { prisma, Prisma } = require('#libs/prisma')

const { NotFoundError } = require('#errors')

const deleteCourse = async (id) => {
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

module.exports = deleteCourse

const { prisma, Prisma } = require('#libs/prisma')
const { ConflictError } = require('#errors')

const createCourse = async (data) => {
  try {
    await prisma.course.create({ data })
    return true
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

module.exports = createCourse

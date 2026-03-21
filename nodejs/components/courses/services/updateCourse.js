const { prisma, Prisma } = require('#libs/prisma')
const { NotFoundError } = require('#errors')

const updateCourse = async ({ id, title, description }) => {
  const data = {}

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

module.exports = updateCourse

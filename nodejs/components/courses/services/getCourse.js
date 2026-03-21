const { prisma } = require('#libs/prisma')
const { NotFoundError } = require('#errors')

const getCourse = async (id) => {
  const course = await prisma.course.findUnique({
    where: { id },
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

  if (!course) {
    throw new NotFoundError({
      code: 'COURSE_NOT_FOUND',
      text: `Course with id=${id} not found`
    })
  }

  return course
}

module.exports = getCourse

const { prisma } = require('#libs/prisma')
const { NotFoundError } = require('#errors')

const getCreatorCourses = async ({ creatorId, limit, offset }) => {
  const creator = await prisma.user.findUnique({
    where: { id: creatorId }
  })

  if (!creator || creator.role === 'student') {
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

module.exports = getCreatorCourses

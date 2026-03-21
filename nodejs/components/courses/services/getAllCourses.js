const { prisma } = require('#libs/prisma')
const getAllCourses = async ({ limit, offset }) => {
  const courses = await prisma.course.findMany({
    orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
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
    take: limit,
    skip: offset,
    omit: { creatorId: true }
  })

  return courses
}

module.exports = getAllCourses

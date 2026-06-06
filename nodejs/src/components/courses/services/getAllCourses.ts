import { prisma } from '#libs/prisma'

interface GetCoursesOptions {
  limit: number
  offset: number
}

export const getAllCoursesService = async ({
  limit,
  offset
}: GetCoursesOptions) => {
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

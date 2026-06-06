import { prisma } from '#libs/prisma'
import { ForbiddenError } from '#errors'

export const checkCourseAccessService = async (
  courseId: number,
  studentId: number
) => {
  const access = await prisma.courseStudent.findFirst({
    where: { courseId, studentId }
  })

  if (!access) {
    throw new ForbiddenError({
      code: 'COURSE_ACCESS_DENIED',
      text: 'Недостаточно прав для просмотра курса'
    })
  }
}

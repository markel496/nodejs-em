const { prisma } = require('#libs/prisma')
const { ForbiddenError, NotFoundError } = require('#errors')

const getStudentCourses = async ({
  role,
  userId,
  studentId,
  limit,
  offset
}) => {
  const student = await prisma.user.findUnique({
    where: { id: studentId }
  })

  if (!student || student.role !== 'student') {
    throw new NotFoundError({
      code: 'STUDENT_NOT_FOUND',
      text: `Student with id=${studentId} not found`
    })
  }

  if (role === 'student' && userId !== studentId) {
    throw new ForbiddenError({
      code: 'COURSES_ACCESS_DENIED',
      text: 'Недостаточно прав для просмотра курсов'
    })
  }

  const courses = await prisma.courseStudent.findMany({
    where: { studentId },
    orderBy: [{ enrolledAt: 'desc' }, { id: 'asc' }],
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          creator: {
            select: {
              id: true,
              name: true,
              surname: true,
              age: true,
              email: true,
              role: true
            }
          },
          createdAt: true,
          updatedAt: true
        }
      }
    },
    take: limit,
    skip: offset,
    omit: { courseId: true, studentId: true }
  })

  return courses
}

module.exports = getStudentCourses

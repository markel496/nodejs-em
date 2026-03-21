const { prisma, Prisma } = require('#libs/prisma')
const { NotFoundError, ConflictError } = require('#errors')

const enrollStudent = async ({ courseId, studentId }) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId }
  })

  if (!course) {
    throw new NotFoundError({
      code: 'COURSE_NOT_FOUND',
      text: `Course with id=${courseId} not found`
    })
  }

  const student = await prisma.user.findFirst({
    where: { id: studentId, role: 'student' }
  })

  if (!student) {
    throw new NotFoundError({
      code: 'STUDENT_NOT_FOUND',
      text: `Student with id=${studentId} not found`
    })
  }

  try {
    await prisma.courseStudent.create({
      data: {
        courseId: courseId,
        studentId: studentId
      }
    })

    return true
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictError({
        code: 'STUDENT_ALREADY_ENROLLED',
        text: `Student ${studentId} is already enrolled in course ${courseId}`
      })
    }

    throw error
  }
}

module.exports = enrollStudent

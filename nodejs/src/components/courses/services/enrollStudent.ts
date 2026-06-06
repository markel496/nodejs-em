import { prisma, Prisma } from '#libs/prisma'
import { NotFoundError, ConflictError } from '#errors'
import { UserRole } from '@prisma/client'

import type { EnrollStudentData } from '../types/requests.js'

export const enrollStudentService = async ({
  courseId,
  studentId
}: EnrollStudentData) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true }
  })

  if (!course) {
    throw new NotFoundError({
      code: 'COURSE_NOT_FOUND',
      text: `Course with id=${courseId} not found`
    })
  }

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    select: { id: true, role: true }
  })

  if (!student || student.role !== UserRole.student) {
    throw new NotFoundError({
      code: 'STUDENT_NOT_FOUND',
      text: `Student with id=${studentId} not found`
    })
  }

  try {
    await prisma.courseStudent.create({
      data: { courseId, studentId }
    })

    return { message: `Student ${studentId} enrolled in course ${courseId}` }
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

import { UserRole } from '@prisma/client'
import { prisma } from '#libs/prisma'
import { ForbiddenError, NotFoundError } from '#errors'

import type { GetStudentCoursesData } from '../types/requests.js'

export const getStudentCoursesService = async ({
  role,
  userId,
  studentId,
  limit,
  offset
}: GetStudentCoursesData) => {
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

  if (role === UserRole.student && userId !== studentId) {
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

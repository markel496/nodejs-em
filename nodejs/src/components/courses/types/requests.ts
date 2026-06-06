import type { UserRole } from '@prisma/client'

export interface CreateCourseRequestBody {
  title: string
  description?: string
}

export type CreateCourseData = CreateCourseRequestBody & { creatorId: number }

export interface EnrollStudentRequestBody {
  studentId: number
}

export type EnrollStudentData = EnrollStudentRequestBody & { courseId: number }

export type GetCreatorCoursesData = {
  creatorId: number
  limit: number
  offset: number
}

export type GetStudentCoursesData = {
  role: UserRole
  userId: number
  studentId: number
  limit: number
  offset: number
}

export type UpdateCourseRequestBody = Partial<CreateCourseRequestBody>

export type UpdateCourseData = UpdateCourseRequestBody & { id: number }

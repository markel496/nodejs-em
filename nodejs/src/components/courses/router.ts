import express from 'express'
import { UserRole } from '@prisma/client'

import { checkAuth, checkRole } from '#middleware'

import CreateCourse from './controllers/CreateCourse.js'
import UpdateCourse from './controllers/UpdateCourse.js'
import DeleteCourse from './controllers/DeleteCourse.js'
import GetCourse from './controllers/GetCourse.js'
import EnrollStudent from './controllers/EnrollStudent.js'
import GetCreatorCourses from './controllers/GetCreatorCourses.js'
import GetStudentCourses from './controllers/GetStudentCourses.js'
import GetAllCourses from './controllers/GetAllCourses.js'

const router = express.Router()

router.post('/courses', checkAuth, checkRole(UserRole.mentor), CreateCourse.run)

router.patch(
  '/courses/:id',
  checkAuth,
  checkRole(UserRole.mentor),
  UpdateCourse.run
)

router.delete(
  '/courses/:id',
  checkAuth,
  checkRole(UserRole.admin),
  DeleteCourse.run
)

router.post(
  '/courses/:id/enroll',
  checkAuth,
  checkRole(UserRole.mentor),
  EnrollStudent.run
)

router.get(
  '/courses/:id',
  checkAuth,
  checkRole(UserRole.student),
  GetCourse.run
)

router.get(
  '/mentors/:id/courses',
  checkAuth,
  checkRole(UserRole.mentor),
  GetCreatorCourses.run
)

router.get(
  '/students/:id/courses',
  checkAuth,
  checkRole(UserRole.student),
  GetStudentCourses.run
)

router.get(
  '/admin/courses',
  checkAuth,
  checkRole(UserRole.admin),
  GetAllCourses.run
)

export default router

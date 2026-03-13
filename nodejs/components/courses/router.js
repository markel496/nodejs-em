const express = require('express')
const checkAuth = require('#middleware/checkAuth')
const checkRole = require('#middleware/checkRole')

const CreateCourse = require('./controllers/CreateCourse')
const UpdateCourse = require('./controllers/UpdateCourse')
const DeleteCourse = require('./controllers/DeleteCourse')
const GetCourse = require('./controllers/GetCourse')
const EnrollStudent = require('./controllers/EnrollStudent')

const GetMentorCourses = require('./controllers/GetMentorCourses')
const GetStudentCourses = require('./controllers/GetStudentCourses')
const GetAllCourses = require('./controllers/GetAllCourses')

const router = express.Router()

router.post('/courses', checkAuth, checkRole('mentor'), CreateCourse.run)

router.patch('/courses/:id', checkAuth, checkRole('mentor'), UpdateCourse.run)

router.delete('/courses/:id', checkAuth, checkRole('admin'), DeleteCourse.run)

router.post(
  '/courses/:id/enroll',
  checkAuth,
  checkRole('mentor'),
  EnrollStudent.run
)

router.get('/courses/:id', checkAuth, checkRole('student'), GetCourse.run)

router.get(
  '/mentors/:id/courses',
  checkAuth,
  checkRole('student'),
  GetMentorCourses.run
)

router.get(
  '/students/:id/courses',
  checkAuth,
  checkRole('student'),
  GetStudentCourses.run
)

router.get('/admin/courses', checkAuth, checkRole('admin'), GetAllCourses.run)

module.exports = router

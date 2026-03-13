const db = require('#libs/database')
const { NotFoundError, ConflictError } = require('#errors')

const enrollStudent = async ({ courseId, studentId }) => {
  const existsCourse = await db.oneOrNone(
    `SELECT 1 FROM courses
     WHERE id = $1`,
    [courseId]
  )

  if (!existsCourse) {
    throw new NotFoundError({
      code: 'COURSE_NOT_FOUND',
      text: `Course with id=${courseId} not found`
    })
  }

  const existsStudent = await db.oneOrNone(
    `SELECT 1 FROM users
     WHERE id = $1 AND role = 'student'`,
    [studentId]
  )

  if (!existsStudent) {
    throw new NotFoundError({
      code: 'STUDENT_NOT_FOUND',
      text: `Student with id=${studentId} not found`
    })
  }

  const enrolled = await db.oneOrNone(
    `INSERT INTO course_students (course_id, student_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING id
    `,
    [courseId, studentId]
  )

  if (!enrolled) {
    throw new ConflictError({
      code: 'STUDENT_ALREADY_ENROLLED',
      text: `Student ${studentId} is already enrolled in course ${courseId}`
    })
  }
  return true
}

module.exports = enrollStudent

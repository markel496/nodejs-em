const db = require('#libs/database')
const { ForbiddenError } = require('#errors')

const checkAccess = async (courseId, userId) => {
  const enrolled = await db.oneOrNone(
    `SELECT 1 FROM course_students
     WHERE course_id = $1 AND student_id = $2
    `,
    [courseId, userId]
  )

  if (!enrolled) {
    throw new ForbiddenError({
      code: 'COURSE_ACCESS_DENIED',
      text: 'Недостаточно прав для просмотра курса'
    })
  }
}

module.exports = checkAccess

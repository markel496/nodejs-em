const db = require('#libs/database')
const { NotFoundError } = require('#errors')

const getMentorCourses = async ({ mentorId, limit, offset }) => {
  const existsCreator = await db.oneOrNone(
    `SELECT 1 FROM users
     WHERE id = $1 AND role <> 'student'`,
    [mentorId]
  )

  if (!existsCreator) {
    throw new NotFoundError({
      code: 'CREATOR_NOT_FOUND',
      text: `Course creator with id=${mentorId} not found`
    })
  }

  const courses = await db.any(
    `
    SELECT id, title, description, created_at, updated_at
    FROM courses
    WHERE creator_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [mentorId, limit, offset]
  )
  return courses
}

module.exports = getMentorCourses

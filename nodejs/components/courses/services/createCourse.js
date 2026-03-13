const db = require('#libs/database')
const { ConflictError } = require('#errors')

const createCourse = async ({ title, description, creatorId }) => {
  const created = await db.oneOrNone(
    `INSERT INTO courses (title, description, creator_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (title) DO NOTHING
     RETURNING id
     `,
    [title, description ?? null, creatorId]
  )

  if (!created) {
    throw new ConflictError({
      code: 'COURSE_TITLE_EXISTS',
      text: `Course with title '${title}' already exists`
    })
  }

  return true
}

module.exports = createCourse

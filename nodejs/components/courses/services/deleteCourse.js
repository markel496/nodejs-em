const db = require('#libs/database')
const { NotFoundError } = require('#errors')

const deleteCourse = async ({ courseId }) => {
  const deleted = await db.oneOrNone(
    `DELETE FROM courses 
     WHERE id = $1
     RETURNING id`,
    [courseId]
  )
  if (!deleted) {
    throw new NotFoundError({
      code: 'COURSE_NOT_FOUND',
      text: `Course with id=${courseId} not found`
    })
  }

  return { message: `Course with id=${courseId} deleted successfully` }
}

module.exports = deleteCourse

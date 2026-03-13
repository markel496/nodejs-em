const db = require('#libs/database')
const { NotFoundError } = require('#errors')

const getCourse = async (courseId) => {
  const course = await db.oneOrNone(
    `SELECT 
      c.id,
      c.title,
      c.description,
      c.created_at,
      c.updated_at,
      u.id AS creator_id,
      u.name AS creator_name,
      u.surname AS creator_surname,
      u.age AS creator_age,
      u.email AS creator_email,
      u.role AS creator_role
    FROM courses c
    JOIN users u ON u.id = c.creator_id
    WHERE c.id = $1
    `,
    [courseId]
  )

  if (!course) {
    throw new NotFoundError({
      code: 'COURSE_NOT_FOUND',
      text: `Course with id=${courseId} not found`
    })
  }

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    creator: {
      id: course.creator_id,
      name: course.creator_name,
      surname: course.creator_surname,
      age: course.creator_age,
      email: course.creator_email,
      role: course.creator_role
    },
    created_at: course.created_at,
    updated_at: course.updated_at
  }
}

module.exports = getCourse

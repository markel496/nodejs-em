const db = require('#libs/database')
const { NotFoundError } = require('#errors')

const updateCourse = async ({ id, title, description }) => {
  const updated = await db.oneOrNone(
    `WITH updated_course AS (
     UPDATE courses
     SET 
      title = COALESCE($2, title),
      description = COALESCE($3, description),
      updated_at = NOW()
     WHERE id = $1
     RETURNING *
     )
    SELECT 
     uc.id,
     uc.title,
     uc.description,
     uc.created_at,
     uc.updated_at,
     u.id AS creator_id,
     u.name AS creator_name,
     u.surname AS creator_surname,
     u.age AS creator_age,
     u.email AS creator_email,
     u.role AS creator_role
     FROM updated_course uc
     JOIN users u ON u.id = uc.creator_id;`,
    [id, title, description]
  )

  if (!updated) {
    throw new NotFoundError({
      code: 'COURSE_NOT_FOUND',
      text: `Course with id=${id} not found`
    })
  }

  return {
    id: updated.id,
    title: updated.title,
    description: updated.description,
    creator: {
      id: updated.creator_id,
      name: updated.creator_name,
      surname: updated.creator_surname,
      age: updated.creator_age,
      email: updated.creator_email,
      role: updated.creator_role
    },
    created_at: updated.created_at,
    updated_at: updated.updated_at
  }
}

module.exports = updateCourse

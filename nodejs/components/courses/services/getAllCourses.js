const db = require('#libs/database')

const getAllCourses = async ({ limit, offset }) => {
  const courses = await db.any(
    `
    SELECT 
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
    ORDER BY c.created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  )
  return courses
}

module.exports = getAllCourses

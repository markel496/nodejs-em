const db = require('#libs/database')
const { ForbiddenError, NotFoundError } = require('#errors')

const getStudentCourses = async ({
  role,
  userId,
  studentId,
  limit,
  offset
}) => {
  if (role === 'student' && userId !== studentId) {
    throw new ForbiddenError({
      code: 'COURSES_ACCESS_DENIED',
      text: 'Недостаточно прав для просмотра курсов'
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

  const courses = await db.any(
    `
    SELECT 
      c.id,
      c.title,
      c.description,
      u.id AS creator_id,
      u.name AS creator_name,
      u.surname AS creator_surname,
      u.age AS creator_age,
      u.email AS creator_email,
      u.role AS creator_role,
      c.created_at,
      c.updated_at
    FROM course_students
    JOIN courses c ON course_id = c.id
	  JOIN users u ON c.creator_id = u.id
    WHERE student_id = $1
    ORDER BY c.created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [studentId, limit, offset]
  )
  return courses
}

module.exports = getStudentCourses

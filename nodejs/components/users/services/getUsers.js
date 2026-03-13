const db = require('#libs/database')

const getUsers = async (limit, offset, role) => {
  const users = await db.any(
    `SELECT * FROM users
     WHERE ($3::text IS NULL OR role = $3)
     ORDER BY id
     LIMIT $1 OFFSET $2`,
    [limit, offset, role]
  )

  return users
}

module.exports = getUsers

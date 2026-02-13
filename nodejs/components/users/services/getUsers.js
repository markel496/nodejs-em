const db = require('#libs/database')

const getUsers = async ({ limit, offset }) => {
  const users = await db.any(
    'SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset]
  )

  return users
}

module.exports = getUsers

const db = require('#libs/database')

const getUserByEmail = async (email) => {
  const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [
    email
  ])

  return user
}

module.exports = getUserByEmail

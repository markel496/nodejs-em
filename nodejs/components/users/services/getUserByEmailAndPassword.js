const db = require('#libs/database')
const hashPassword = require('#helpers/hashPassword')

const getUserByEmailAndPassword = async (email, password) => {
  const hashedPassword = hashPassword(password) // Пароли надо скрывать

  const user = await db.oneOrNone(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, hashedPassword]
  )

  return user
}

module.exports = getUserByEmailAndPassword

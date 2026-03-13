const db = require('#libs/database')
const hashPassword = require('#helpers/hashPassword')
const { AuthorizationError } = require('#errors')

const getUserByEmailAndPassword = async (email, password) => {
  const hashedPassword = hashPassword(password) // Пароли надо скрывать

  const user = await db.oneOrNone(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, hashedPassword]
  )

  if (!user) {
    throw new AuthorizationError({
      code: 'AUTH_FAILED',
      text: 'Email или пароль не верен'
    })
  }

  return user
}

module.exports = getUserByEmailAndPassword

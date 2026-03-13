const db = require('#libs/database')
const { RegistrationError } = require('#errors')
const hashPassword = require('#helpers/hashPassword.js')

const createUser = async (userData) => {
  const { name, surname, age, password, email } = userData

  const hashedPassword = hashPassword(password) // Пароли надо скрывать

  const created = await db.oneOrNone(
    `
     INSERT INTO users (name, surname, age, password, email)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING
     RETURNING id
    `,
    [name, surname, age, hashedPassword, email]
  )

  if (!created) {
    throw new RegistrationError({
      code: 'USER_EMAIL_EXISTS',
      text: `Пользователь с почтой '${email}' уже существует`
    })
  }

  return true
}

module.exports = createUser

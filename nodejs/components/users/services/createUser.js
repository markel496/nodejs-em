const db = require('#libs/database')
const hashPassword = require('#helpers/hashPassword.js')

const createUser = async (usersData) => {
  const { name, surname, age, password, email } = usersData

  const hashedPassword = hashPassword(password) // Пароли надо скрывать

  await db.none(
    'INSERT INTO users (name, surname, age, password, email) VALUES ($1, $2, $3, $4, $5)',
    [name, surname, age, hashedPassword, email]
  )

  return true
}

module.exports = createUser

const db = require('../../../libs/database')

const createUsers = async (usersData) => {
  const { name, surname, age, password, email } = usersData

  const hashPassword = password // Пароли надо скрывать

  await db.none(
    'INSERT INTO users (name, surname, age, password, email) VALUES ($1, $2, $3, $4, $5)',
    [name, surname, age, hashPassword, email]
  )

  return true
}

module.exports = createUsers

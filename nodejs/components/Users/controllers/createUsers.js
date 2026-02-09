const createUsersService = require('../services/createUsers')

const createUsersController = async (req, res) => {
  const { name, surname, age, password, email } = req.body
  const usersData = {
    name,
    surname,
    age,
    password,
    email
  }

  await createUsersService(usersData)

  res.send('OK')
}

module.exports = createUsersController

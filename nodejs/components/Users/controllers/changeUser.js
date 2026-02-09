const changeUserService = require('../services/changeUser')

const changeUserController = async (req, res) => {
  const id = Number(req.params.id)
  const { name, surname } = req.body

  const updatedUser = await changeUserService({ id, name, surname })

  res.json(updatedUser)
}

module.exports = changeUserController

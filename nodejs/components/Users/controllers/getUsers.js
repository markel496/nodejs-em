const getUsersService = require('../services/getUsers')

const getUsersController = async (req, res) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const users = await getUsersService({ limit, page })

  res.json(users)
}

module.exports = getUsersController

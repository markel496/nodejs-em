const express = require('express')
const getUsersController = require('./controllers/getUsers')
const createUsersController = require('./controllers/createUsers')
const changeUserController = require('./controllers/changeUser')

const router = express.Router()

router.get('/users', getUsersController)
router.post('/users', createUsersController)
router.patch('/users/:id', changeUserController)

module.exports = router

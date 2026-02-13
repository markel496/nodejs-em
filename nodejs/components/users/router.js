const express = require('express')
const GetUsersController = require('./controllers/GetUsers')
const CreateUsersController = require('./controllers/CreateUsers')
const changeUserController = require('./controllers/changeUser')

const router = express.Router()

router.get('/users', GetUsersController.run)
router.post('/users', CreateUsersController.run)
router.patch('/users/:id', changeUserController)

module.exports = router

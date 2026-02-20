const express = require('express')
const GetUsersController = require('./controllers/GetUsers')
const CreateUserController = require('./controllers/CreateUser')
const LoginController = require('./controllers/Login')
const RefreshController = require('./controllers/Refresh')
const changeUserController = require('./controllers/changeUser')
const checkAuth = require('#middleware/authMiddleware')

const router = express.Router()

router.get('/users', checkAuth, GetUsersController.run)
router.post('/users', CreateUserController.run)
router.patch('/users/:id', changeUserController)
router.get('/login', LoginController.run)
router.post('/refresh', RefreshController.run)

module.exports = router

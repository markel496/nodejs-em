const express = require('express')
const GetUsersController = require('./controllers/GetUsers')
const CreateUserController = require('./controllers/CreateUser')
const LoginController = require('./controllers/Login')
const RefreshController = require('./controllers/Refresh')
const UpdateUserController = require('./controllers/UpdateUser')
const checkAuth = require('#middleware/checkAuth')
const checkRole = require('#middleware/checkRole')

const router = express.Router()

router.get('/users', checkAuth, GetUsersController.run)
router.post('/users', checkAuth, checkRole('mentor'), CreateUserController.run)
router.patch(
  '/users/:id',
  checkAuth,
  checkRole('mentor'),
  UpdateUserController.run
)
router.post('/login', LoginController.run)
router.post('/refresh', RefreshController.run)

module.exports = router

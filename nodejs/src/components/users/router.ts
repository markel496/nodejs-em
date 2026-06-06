import express from 'express'
import { UserRole } from '@prisma/client'

import { checkAuth, checkRole } from '#middleware'

import GetUsersController from './controllers/GetUsers.js'
import CreateUserController from './controllers/CreateUser.js'
import LoginController from './controllers/Login.js'
import RefreshController from './controllers/Refresh.js'
import UpdateUserController from './controllers/UpdateUser.js'

const router = express.Router()

router.get('/users', checkAuth, GetUsersController.run)
router.post(
  '/users',
  checkAuth,
  checkRole(UserRole.mentor),
  CreateUserController.run
)
router.patch(
  '/users/:id',
  checkAuth,
  checkRole(UserRole.mentor),
  UpdateUserController.run
)
router.post('/login', LoginController.run)
router.post('/refresh', RefreshController.run)

export default router

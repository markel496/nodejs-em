import { Router } from 'express'
import usersRouter from '#components/users/router'
import coursesRouter from '#components/courses/router'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use(usersRouter)
router.use(coursesRouter)

export default router

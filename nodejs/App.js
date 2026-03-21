const express = require('express')
const config = require('config')
const router = require('./router')
const usersRouter = require('#components/users/router')
const coursesRouter = require('#components/courses/router')
const errorHandler = require('#middleware/errorHandler')
const notFound = require('#middleware/notFound')

// require('#libs/database')
require('#libs/redis')

const app = express()

app.use(express.json())
app.use(router)
app.use(usersRouter)
app.use(coursesRouter)
app.use(notFound)
app.use(errorHandler)

const port = config.get('server.port')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

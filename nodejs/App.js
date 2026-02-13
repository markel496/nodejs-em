const express = require('express')
const config = require('config')
const router = require('./router')
const userRouter = require('#components/users/router')

require('#libs/database')

const app = express()

app.use(express.json())
app.use(router)
app.use(userRouter)

const port = config.get('server.port')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

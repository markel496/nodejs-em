import express from 'express'
import config from 'config'
import router from './router.js'
import { errorHandler } from '#middleware/errorHandler'
import { notFound } from '#middleware/notFound'
import { connectDatabase } from '#libs/prisma'
import '#libs/redis'

const app = express()

app.use(express.json())
app.use(router)
app.use(notFound)
app.use(errorHandler)

const port = config.get('server.port')
await connectDatabase()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

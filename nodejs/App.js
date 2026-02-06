const express = require('express')
const app = express()
const router = express.Router()

const PORT = 3000

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

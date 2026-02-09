const pgp = require('pg-promise')()
const config = require('config')

const { host, port, user, password, name: database } = config.get('database')

const db = pgp({
  host,
  port,
  user,
  password,
  database
})

db.connect()
  .then((connect) => {
    console.log('Connect to DB success')

    connect.done()
  })
  .catch((error) => {
    console.error('Database connection error', error)
  })

module.exports = db

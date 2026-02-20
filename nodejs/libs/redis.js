const Redis = require('ioredis')
const config = require('config')

const { port, host, password, db } = config.get('redis')

const redis = new Redis({
  port,
  host,
  password,
  db
})

redis.on('connect', () => {
  console.log('Redis connected')
})

redis.on('error', (err) => {
  console.error('Redis error:', err)
})

module.exports = redis

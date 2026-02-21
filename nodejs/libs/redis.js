const Redis = require('ioredis')
const config = require('config')

const { port, host, password, db } = config.get('redis')

const redis = new Redis({
  port,
  host,
  password,
  db,
  retryStrategy(times) {
    const maxAttempts = 5

    if (times > maxAttempts) {
      console.error('Redis: превышено количество попыток подключения')
      return null // ОСТАНОВИТЬ переподключение
    }

    console.log(`Redis: попытка подключения №${times}`)
    return 2000 // задержка 2 секунды
  },

  maxRetriesPerRequest: 3 // ограничение попыток на одну команду
})

redis.on('connect', () => {
  console.log('Redis connected')
})

redis.on('error', (err) => {
  console.error('Redis error:', err)
})

module.exports = redis

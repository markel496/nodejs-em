import { Redis } from 'ioredis'
import config from 'config'

import type { RedisConfig } from '#types/config'

const { port, host, password, db } = config.get<RedisConfig>('redis')

const redis = new Redis({
  port,
  host,
  password,
  db,
  retryStrategy(times: number) {
    const maxAttempts = 5

    if (times > maxAttempts) {
      console.error('Redis: превышено количество попыток подключения')
      return // ОСТАНОВИТЬ переподключение
    }

    console.log(`Redis: попытка подключения №${times}`)
    return 2000 // задержка 2 секунды
  },

  maxRetriesPerRequest: 3 // ограничение попыток на одну команду
})

redis.on('connect', () => {
  console.log('✅ Redis connected successfully')
})

redis.on('error', (err) => {
  console.error('Redis error:', err)
})

export default redis

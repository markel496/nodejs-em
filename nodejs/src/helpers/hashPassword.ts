import crypto from 'crypto'
import config from 'config'

export const hashPassword = (value: string) =>
  crypto
    .createHmac('sha256', config.get('auth.password_key'))
    .update(value)
    .digest('hex')

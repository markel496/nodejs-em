const crypto = require('crypto')
const config = require('config')

const secret = config.get('auth.password_key')

const hashPassword = (value) =>
  crypto.createHmac('sha256', secret).update(value).digest('hex')

module.exports = hashPassword

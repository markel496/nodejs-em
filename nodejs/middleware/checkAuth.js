const config = require('config')
const jwt = require('jsonwebtoken')
const { AuthorizationError } = require('#errors')
const getSessionByTokenService = require('#components/users/services/getSessionByToken')

const checkAuth = async (req, res, next) => {
  const now = Date.now()
  const { authorization } = req.headers

  try {
    const key = config.get('auth.token_key')
    jwt.verify(authorization, key)
    const session = await getSessionByTokenService(authorization)

    if (!session) {
      throw new Error('Authorization error')
    }

    const tokenExpireDate = new Date(session.expire).getTime()

    if (now > tokenExpireDate) {
      throw new Error('Токен устарел')
    }

    req.state = { user: session }
  } catch (error) {
    return next(
      new AuthorizationError({
        code: 'INVALID_TOKEN',
        text: error.message
      })
    )
  }

  next()
}

module.exports = checkAuth

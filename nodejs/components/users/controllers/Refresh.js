const BaseController = require('#classes/BaseController')
const getUserByRefreshToken = require('../services/getUserByRefreshToken')
const getTokensService = require('../services/getTokens')
const config = require('config')
const jwt = require('jsonwebtoken')
const removeExistingSession = require('../services/removeExistingSession')

class RefreshController extends BaseController {
  get bodySchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['refreshToken'],
      properties: {
        refreshToken: { type: 'string' }
      }
    }
  }

  async controller(req) {
    const { refreshToken } = req.body

    const user = await getUserByRefreshToken(refreshToken)

    const now = Date.now()
    const key = config.get('auth.token_key')
    const { expire } = jwt.verify(refreshToken, key)

    const tokenExpireDate = new Date(expire).getTime()

    if (now > tokenExpireDate) {
      throw new AuthorizationError({
        code: 'INVALID_TOKEN',
        text: 'Токен устарел'
      })
    }

    await removeExistingSession(user.id)

    const session = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role
    }

    const tokens = await getTokensService(session)

    return tokens
  }
}

module.exports = new RefreshController()

const BaseController = require('#Classes/BaseController')
const getUserByRefreshToken = require('../services/getUserByRefreshToken')
const getTokensService = require('../services/getTokens')
const config = require('config')
const jwt = require('jsonwebtoken')

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

    if (!user) {
      return 'Refresh token is incorrect' // Тут бы еще 401 отдавать
    }

    const now = Date.now()
    const key = config.get('auth.token_key')
    const { expire } = jwt.verify(refreshToken, key)

    const tokenExpireDate = new Date(expire).getTime()

    if (now > tokenExpireDate) {
      throw new Error('Refresh token is deprecated')
    }

    const session = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email
    }

    const tokens = getTokensService(session)

    return tokens
  }
}

module.exports = new RefreshController()

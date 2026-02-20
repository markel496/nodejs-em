const BaseController = require('#Classes/BaseController')
const getUserByEmailAndPasswordService = require('../services/getUserByEmailAndPassword')
const getTokensService = require('../services/getTokens')

class LoginController extends BaseController {
  get bodySchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      }
    }
  }

  async controller(req) {
    const { email, password } = req.body

    const user = await getUserByEmailAndPasswordService(email, password)

    if (!user) {
      return 'Password or email is incorrect' // Тут бы еще 401 отдавать
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

module.exports = new LoginController()

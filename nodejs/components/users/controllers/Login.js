const BaseController = require('#classes/BaseController')
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

module.exports = new LoginController()

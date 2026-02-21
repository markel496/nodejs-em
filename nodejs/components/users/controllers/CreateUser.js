const BaseController = require('#classes/BaseController')
const { RegistrationError } = require('#errors')
const createUserService = require('../services/createUser')
const getUserByEmailService = require('../services/getUserByEmail')

class CreateUserController extends BaseController {
  get bodySchema() {
    return {
      type: 'object',
      required: ['name', 'surname', 'password', 'email'],
      additionalProperties: false,
      properties: {
        name: { type: 'string', minLength: 2 },
        surname: { type: 'string', minLength: 2 },
        age: { type: 'number' },
        email: { type: 'string', format: 'email' },
        password: {
          type: 'string',
          pattern:
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        }
      }
    }
  }

  async controller(req) {
    const { name, surname, age, password, email } = req.body

    const user = getUserByEmailService(email)

    if (user) {
      throw new RegistrationError({
        code: 'registration_error',
        text: `Пользователь с почтой ${email} уже существует`
      })
    }

    const result = await createUserService({
      name,
      surname,
      age,
      password,
      email
    })

    return { success: result }
  }
}

module.exports = new CreateUserController()

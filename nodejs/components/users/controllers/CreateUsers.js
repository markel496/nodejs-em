const BaseController = require('#classes/BaseController')
const createUsersService = require('../services/createUsers')

class CreateUsersController extends BaseController {
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

    const result = await createUsersService({
      name,
      surname,
      age,
      password,
      email
    })

    return { success: result }
  }
}

module.exports = new CreateUsersController()

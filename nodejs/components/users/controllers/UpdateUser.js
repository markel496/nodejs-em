const BaseController = require('#classes/BaseController')
const updateUserService = require('../services/updateUser')

class UpdateUserController extends BaseController {
  get paramsSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: {
          type: 'string',
          pattern: '^[1-9]\\d*$'
        }
      }
    }
  }

  get bodySchema() {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', minLength: 2 },
        surname: { type: 'string', minLength: 2 },
        age: { type: 'number' },
        email: { type: 'string', format: 'email' }
      },
      // Должно быть передано хотя бы одно поле
      anyOf: [
        { required: ['name'] },
        { required: ['surname'] },
        { required: ['age'] },
        { required: ['email'] }
      ]
    }
  }

  async controller(req) {
    const { id: userId } = req.params
    const { name, surname, age, email } = req.body

    const updated = await updateUserService({
      id: Number(userId),
      name,
      surname,
      age,
      email
    })

    return updated
  }
}

module.exports = new UpdateUserController()

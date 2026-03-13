const BaseController = require('#classes/BaseController')
const getUsersService = require('../services/getUsers')

class GetUsersController extends BaseController {
  get querySchema() {
    return {
      type: 'object',
      required: ['limit', 'page'],
      additionalProperties: false,
      properties: {
        limit: {
          type: 'string',
          pattern: '^[1-9]\\d*$'
        },
        page: {
          type: 'string',
          pattern: '^[1-9]\\d*$'
        },
        role: {
          type: 'string',
          enum: ['admin', 'mentor', 'student', '']
        }
      }
    }
  }

  formatUser(user) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      age: user.age,
      email: user.email
    }
  }

  async controller(req) {
    const { page, limit: lpage, role } = req.query

    const limit = Number(lpage)
    const offset = (Number(page) - 1) * limit
    const roleFilter = role || undefined

    const users = await getUsersService(limit, offset, roleFilter)

    return users.map(this.formatUser)
  }
}

module.exports = new GetUsersController()

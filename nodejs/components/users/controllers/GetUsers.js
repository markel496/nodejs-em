const BaseController = require('#classes/BaseController')
const getUsersService = require('../services/getUsers')

class GetUsersController extends BaseController {
  get querySchema() {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        limit: {
          type: 'string',
          pattern: '^$|^[1-9]\\d*$'
        },
        page: {
          type: 'string',
          pattern: '^$|^[1-9]\\d*$'
        },
        role: {
          type: 'string',
          enum: ['admin', 'mentor', 'student', '']
        }
      }
    }
  }

  async controller(req) {
    const { page, limit: lpage, role } = req.query

    const limit = Number(lpage) || 20
    const currentPage = Number(page) || 1
    const offset = (currentPage - 1) * limit

    const users = await getUsersService(limit, offset, role)

    return users
  }
}

module.exports = new GetUsersController()

const BaseController = require('#classes/BaseController')
const getCreatorCoursesService = require('../services/getCreatorCourses')

class GetCreatorCoursesController extends BaseController {
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
        }
      }
    }
  }

  async controller(req) {
    const { page, limit: lpage } = req.query
    const { id } = req.params

    const creatorId = Number(id)
    const limit = Number(lpage) || 20
    const currentPage = Number(page) || 1
    const offset = (currentPage - 1) * limit

    const courses = await getCreatorCoursesService({ creatorId, limit, offset })

    return courses
  }
}

module.exports = new GetCreatorCoursesController()

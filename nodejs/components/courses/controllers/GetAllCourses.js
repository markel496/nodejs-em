const BaseController = require('#classes/BaseController')
const getAllCoursesService = require('../services/getAllCourses')

class GetAllCoursesController extends BaseController {
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

    const limit = Number(lpage) || 20
    const currentPage = Number(page) || 1
    const offset = (currentPage - 1) * limit

    const courses = await getAllCoursesService({ limit, offset })

    return courses
  }
}

module.exports = new GetAllCoursesController()

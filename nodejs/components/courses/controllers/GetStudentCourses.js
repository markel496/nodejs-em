const BaseController = require('#classes/BaseController')
const getStudentCoursesService = require('../services/getStudentCourses')

class GetStudentCoursesController extends BaseController {
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
    const { id: userId, role } = req.state.user

    const studentId = Number(id)
    const limit = Number(lpage) || 20
    const currentPage = Number(page) || 1
    const offset = (currentPage - 1) * limit

    const courses = await getStudentCoursesService({
      userId,
      role,
      studentId,
      limit,
      offset
    })

    return courses
  }
}

module.exports = new GetStudentCoursesController()

const BaseController = require('#classes/BaseController')
const getCourseService = require('../services/getCourse')
const checkAccessService = require('../services/checkAccess')

class GetCourseController extends BaseController {
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

  async controller(req) {
    const { id } = req.params
    const { id: userId, role } = req.state.user

    const courseId = Number(id)

    const course = await getCourseService(courseId)

    if (role === 'student') await checkAccessService(courseId, userId)

    return course
  }
}

module.exports = new GetCourseController()

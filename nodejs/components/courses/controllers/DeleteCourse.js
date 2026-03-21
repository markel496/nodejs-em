const BaseController = require('#classes/BaseController')
const deleteCourseService = require('../services/deleteCourse')

class DeleteCourseController extends BaseController {
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

    const result = await deleteCourseService(Number(id))

    return result
  }
}

module.exports = new DeleteCourseController()

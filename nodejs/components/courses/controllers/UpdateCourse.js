const BaseController = require('#classes/BaseController')
const updateCourseService = require('../services/updateCourse')

class UpdateCourseController extends BaseController {
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
        title: { type: 'string', minLength: 3 },
        description: { type: 'string' }
      },
      // Должно быть передано хотя бы одно поле
      anyOf: [{ required: ['title'] }, { required: ['description'] }]
    }
  }

  async controller(req) {
    const { id: courseId } = req.params
    const { title, description } = req.body

    const updated = await updateCourseService({
      id: Number(courseId),
      title,
      description
    })

    return updated
  }
}

module.exports = new UpdateCourseController()

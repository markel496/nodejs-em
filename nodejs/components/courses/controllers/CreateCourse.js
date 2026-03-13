const BaseController = require('#classes/BaseController')
const createCourseService = require('../services/createCourse')

class CreateCourseController extends BaseController {
  get bodySchema() {
    return {
      type: 'object',
      required: ['title'],
      additionalProperties: false,
      properties: {
        title: { type: 'string', minLength: 3 },
        description: { type: 'string' }
      }
    }
  }

  async controller(req) {
    const { title, description } = req.body
    const { id: creatorId } = req.state.user

    const result = await createCourseService({
      title,
      description,
      creatorId
    })

    return { success: result }
  }
}

module.exports = new CreateCourseController()

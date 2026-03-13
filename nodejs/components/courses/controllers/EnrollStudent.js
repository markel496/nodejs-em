const BaseController = require('#classes/BaseController')
const enrollStudentService = require('../services/enrollStudent')

class EnrollStudentController extends BaseController {
  get bodySchema() {
    return {
      type: 'object',
      required: ['studentId'],
      additionalProperties: false,
      properties: {
        studentId: {
          type: 'string',
          pattern: '^[1-9]\\d*$'
        }
      }
    }
  }

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
    const { id: courseId } = req.params
    const { studentId } = req.body

    const result = await enrollStudentService({
      courseId: Number(courseId),
      studentId: Number(studentId)
    })

    return { success: result }
  }
}

module.exports = new EnrollStudentController()

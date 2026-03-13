const BaseController = require('#classes/BaseController')
const getMentorCoursesService = require('../services/getMentorCourses')

class GetMentorCoursesController extends BaseController {
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
          pattern: '^[1-9]\\d*$'
        },
        page: {
          type: 'string',
          pattern: '^[1-9]\\d*$'
        }
      }
    }
  }

  formatCourse(course) {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      created_at: course.created_at,
      updated_at: course.updated_at
    }
  }

  async controller(req) {
    const { page, limit: lpage } = req.query
    const { id } = req.params

    const mentorId = Number(id)
    const limit = Number(lpage) || 20
    const offset = (Number(page) - 1) * limit || 0

    const courses = await getMentorCoursesService({ mentorId, limit, offset })

    return courses.map(this.formatCourse)
  }
}

module.exports = new GetMentorCoursesController()

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
      creator: {
        id: course.creator_id,
        name: course.creator_name,
        surname: course.creator_surname,
        age: course.creator_age,
        email: course.creator_email,
        role: course.creator_role
      },
      created_at: course.created_at,
      updated_at: course.updated_at
    }
  }

  async controller(req) {
    const { page, limit: lpage } = req.query

    const limit = Number(lpage) || 20
    const offset = (Number(page) - 1) * limit || 0
    const courses = await getAllCoursesService({ limit, offset })

    return courses.map(this.formatCourse)
  }
}

module.exports = new GetAllCoursesController()

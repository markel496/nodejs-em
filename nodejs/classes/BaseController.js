const Ajv = require('ajv').default
const addFormats = require('ajv-formats')
const { ValidationError } = require('#errors')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['email'])

class BaseController {
  constructor() {
    this.controller = this.controller.bind(this)
    this.run = this.run.bind(this)
    this.validate = this.validate.bind(this)
  }
  get bodySchema() {
    return null
  }

  get querySchema() {
    return null
  }

  async controller(req) {
    throw new SyntaxError('Method Controller required')
  }

  #buildRequestError(error) {
    const { message, dataPath: field } = error

    return { field, message }
  }

  validate(req) {
    const errorsList = {}
    if (this.bodySchema) {
      const validate = ajv.compile(this.bodySchema)

      const isValid = validate(req.body)

      if (!isValid) {
        const errors = validate.errors.map(this.#buildRequestError)

        errorsList.body = errors
      }
    }

    if (this.querySchema) {
      const validate = ajv.compile(this.querySchema)

      const isValid = validate(req.query)

      if (!isValid) {
        const errors = validate.errors.map(this.#buildRequestError)

        errorsList.query = errors
      }
    }

    return errorsList
  }

  async run(req, res, next) {
    const errorsList = this.validate(req)

    if (Object.keys(errorsList).length > 0) {
      throw new ValidationError({
        code: 'validation_error',
        text: 'Ошибка валидации',
        data: errorsList
      })
    }

    try {
      const result = await this.controller(req)
      res.status(200).json(result)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = BaseController

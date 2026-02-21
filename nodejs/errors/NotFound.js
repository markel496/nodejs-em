const BaseError = require('#classes/BaseError')

class NotFoundError extends BaseError {
  constructor(errorsData) {
    super('Not found error', {
      code: 'NOT_FOUND',
      text: 'Route not found',
      ...errorsData
    })
    this.statusCode = 404
  }
}

module.exports = NotFoundError

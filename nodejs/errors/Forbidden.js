const BaseError = require('#classes/BaseError')

class ForbiddenError extends BaseError {
  constructor(errorsData) {
    super('Forbidden error', errorsData)
    this.statusCode = 403
  }
}

module.exports = ForbiddenError

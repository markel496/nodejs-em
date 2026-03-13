const BaseError = require('#classes/BaseError')

class ConflictError extends BaseError {
  constructor(errorsData) {
    super('Conflict error', errorsData)
    this.statusCode = 409
  }
}

module.exports = ConflictError

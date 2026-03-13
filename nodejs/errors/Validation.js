const BaseError = require('#classes/BaseError')

class ValidationError extends BaseError {
  constructor(errorsData) {
    super('Validation error', errorsData)
    this.statusCode = 400
  }
}

module.exports = ValidationError

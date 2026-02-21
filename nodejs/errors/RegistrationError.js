const BaseError = require('#classes/BaseError')

class RegistrationError extends BaseError {
  constructor(errorsData) {
    super('Registration error', errorsData)
    this.statusCode = 409
  }
}

module.exports = RegistrationError

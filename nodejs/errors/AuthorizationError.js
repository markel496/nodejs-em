const BaseError = require('#classes/BaseError')

class AuthorizationError extends BaseError {
  constructor(errorsData) {
    super('Authorization error', errorsData)
    this.statusCode = 401
  }
}

module.exports = AuthorizationError

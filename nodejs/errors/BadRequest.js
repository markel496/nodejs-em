const BaseError = require('#classes/BaseError')

class BadRequestError extends BaseError {
  constructor(errorsData) {
    super('Bad request error', errorsData)
    this.statusCode = 400
  }
}

module.exports = BadRequestError

const AuthorizationError = require('./Authorization')
const ValidationError = require('./Validation')
const RegistrationError = require('./Registration')
const ForbiddenError = require('./Forbidden')
const BadRequestError = require('./BadRequest')
const ConflictError = require('./Conflict')
const NotFoundError = require('./NotFound')

module.exports = {
  AuthorizationError,
  ValidationError,
  RegistrationError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
  NotFoundError
}

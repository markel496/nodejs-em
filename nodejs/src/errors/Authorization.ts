import { BaseError } from '#classes/BaseError'
import type { ErrorData } from '#classes/BaseError'

export class AuthorizationError extends BaseError {
  constructor(errorsData: ErrorData) {
    super('Authorization error', errorsData)
    this.statusCode = 401
  }
}

import { BaseError } from '#classes/BaseError'
import type { ErrorData } from '#classes/BaseError'

export class RegistrationError extends BaseError {
  constructor(errorsData: ErrorData) {
    super('Registration error', errorsData)
    this.statusCode = 409
  }
}

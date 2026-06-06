import { BaseError } from '#classes/BaseError'
import type { ErrorData } from '#classes/BaseError'

export class ConflictError extends BaseError {
  constructor(errorsData: ErrorData) {
    super('Conflict error', errorsData)
    this.statusCode = 409
  }
}

import { BaseError } from '#classes/BaseError'
import type { ErrorData } from '#classes/BaseError'

export class NotFoundError extends BaseError {
  constructor(errorsData: ErrorData) {
    super('Not found error', errorsData)
    this.statusCode = 404
  }
}

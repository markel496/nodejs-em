import { BaseError } from '#classes/BaseError'
import type { ErrorData } from '#classes/BaseError'

export class ForbiddenError extends BaseError {
  constructor(
    errorsData: ErrorData = {
      code: 'FORBIDDEN',
      text: 'Недостаточно прав'
    }
  ) {
    super('Forbidden error', errorsData)
    this.statusCode = 403
  }
}

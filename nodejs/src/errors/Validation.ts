import { BaseError } from '#classes/BaseError'
import type { ErrorData } from '#classes/BaseError'

export class ValidationError extends BaseError {
  constructor(data?: ErrorData['data']) {
    super('Validation error', {
      code: 'VALIDATION_ERROR',
      text: 'Ошибка валидации',
      data
    })
    this.statusCode = 400
  }
}

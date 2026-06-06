import { BaseError } from '#classes/BaseError'
import type { ErrorData } from '#classes/BaseError'

export class BadRequestError extends BaseError {
  constructor(data?: ErrorData['data']) {
    super('Bad request error', {
      code: 'BAD_REQUEST_ERROR',
      text: 'Неверный запрос',
      data
    })
    this.statusCode = 400
  }
}

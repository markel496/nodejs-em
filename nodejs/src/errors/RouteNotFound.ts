import { BaseError } from '#classes/BaseError'

export class RouteNotFoundError extends BaseError {
  constructor(method: string, url: string) {
    super('Route not found', {
      code: 'ROUTE_NOT_FOUND',
      text: 'Route not found',
      data: {
        method,
        url
      }
    })

    this.statusCode = 404
  }
}

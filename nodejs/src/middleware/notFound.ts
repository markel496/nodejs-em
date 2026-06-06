import { RouteNotFoundError } from '#errors'

import type { RequestHandler } from 'express'

export const notFound: RequestHandler = (req, _res, next) => {
  next(new RouteNotFoundError(req.method, req.originalUrl))
}

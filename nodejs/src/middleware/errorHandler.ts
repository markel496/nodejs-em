import { BaseError } from '#classes/BaseError'

import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof BaseError) {
    res.status(error.statusCode).json(error.toObject())
    return
  }

  console.error(error)

  res.status(500).json({
    code: 'internal_server_error',
    text: 'Internal server error'
  })
}

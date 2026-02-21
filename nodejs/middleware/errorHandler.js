const errorHandler = (error, req, res, next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json(error.toObject())
  }

  return res.status(500).json({
    code: 'INTERNAL_ERROR',
    text: 'Internal server error'
  })
}

module.exports = errorHandler

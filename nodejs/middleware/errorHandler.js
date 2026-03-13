const errorHandler = (error, req, res, next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json(error.toObject())
  }

  return res.status(500).json(error)
}

module.exports = errorHandler

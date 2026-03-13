const { NotFoundError } = require('#errors')

const notFound = (req, res, next) => {
  next(
    new NotFoundError({
      data: {
        method: req.method,
        url: req.originalUrl
      }
    })
  )
}

module.exports = notFound

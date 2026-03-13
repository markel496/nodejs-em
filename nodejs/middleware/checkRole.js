const { ForbiddenError } = require('#errors')

const ROLES = {
  student: 1,
  mentor: 2,
  admin: 3
}

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.state.user.role

    if (!userRole) {
      return next(
        new ForbiddenError({
          code: 'FORBIDDEN',
          text: 'Недостаточно прав'
        })
      )
    }

    const userLevel = ROLES[userRole]
    const requiredLevel = ROLES[requiredRole]

    if (userLevel < requiredLevel) {
      return next(
        new ForbiddenError({
          code: 'FORBIDDEN',
          text: 'Недостаточно прав'
        })
      )
    }
    next()
  }
}

module.exports = checkRole

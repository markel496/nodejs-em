const { prisma } = require('#libs/prisma')
const { AuthorizationError } = require('#errors')

const getUserByRefreshToken = async (refreshToken) => {
  const user = await prisma.user.findFirst({
    where: { refreshToken },
    omit: { password: true }
  })

  if (!user) {
    throw new AuthorizationError({
      code: 'INVALID_TOKEN',
      text: 'Токен не валидный'
    })
  }

  return user
}

module.exports = getUserByRefreshToken

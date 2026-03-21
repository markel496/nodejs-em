const { prisma } = require('#libs/prisma')
const hashPassword = require('#helpers/hashPassword')
const { AuthorizationError } = require('#errors')

const getUserByEmailAndPassword = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new AuthorizationError({
      code: 'AUTH_FAILED',
      text: 'Email или пароль не верен'
    })
  }

  const hashedPassword = hashPassword(password) // Пароли надо скрывать

  if (user.password !== password) {
    throw new AuthorizationError({
      code: 'AUTH_FAILED',
      text: 'Email или пароль не верен'
    })
  }

  return user
}

module.exports = getUserByEmailAndPassword

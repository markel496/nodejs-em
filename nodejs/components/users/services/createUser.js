const { prisma, Prisma } = require('#libs/prisma')
const { RegistrationError } = require('#errors')
const hashPassword = require('#helpers/hashPassword.js')

const createUser = async (data) => {
  const hashedPassword = hashPassword(data.password) // Пароли надо скрывать

  try {
    await prisma.user.create({
      data: { ...data, password: hashedPassword }
    })

    return true
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new RegistrationError({
        code: 'USER_EMAIL_EXISTS',
        text: `Пользователь с почтой '${data.email}' уже существует`
      })
    }

    throw error
  }
}

module.exports = createUser

import { prisma, Prisma } from '#libs/prisma'

import { RegistrationError } from '#errors'
import { hashPassword } from '#helpers/hashPassword'

import type { CreateUserRequestBody } from '../types/requests.js'

export const createUserService = async ({
  name,
  surname,
  age,
  password,
  email
}: CreateUserRequestBody) => {
  const hashedPassword = hashPassword(password) // Пароли надо скрывать

  try {
    const newUser = await prisma.user.create({
      data: { name, surname, age, password: hashedPassword, email }
    })

    return newUser
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new RegistrationError({
        code: 'USER_EMAIL_EXISTS',
        text: `Пользователь с почтой '${email}' уже существует`
      })
    }

    throw error
  }
}

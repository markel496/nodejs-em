import { prisma } from '#libs/prisma'
// import { hashPassword } from '#helpers/hashPassword'
import { AuthorizationError } from '#errors'

import type { LoginRequestBody } from '../types/requests.js'

export const getUserByEmailAndPasswordService = async ({
  email,
  password
}: LoginRequestBody) => {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new AuthorizationError({
      code: 'AUTH_FAILED',
      text: 'Email или пароль не верен'
    })
  }

  // const hashedPassword = hashPassword(password) // Пароли надо скрывать

  if (user.password !== password) {
    throw new AuthorizationError({
      code: 'AUTH_FAILED',
      text: 'Email или пароль не верен'
    })
  }

  return user
}

import { prisma, Prisma } from '#libs/prisma'
import { NotFoundError } from '#errors'

import type {
  UpdateUserRequestBody,
  UpdateUserData
} from '../types/requests.js'

export const updateUserService = async ({
  id,
  name,
  surname,
  age,
  email
}: UpdateUserData) => {
  const data: UpdateUserRequestBody = {}

  if (name) data.name = name
  if (surname) data.surname = surname
  if (age) data.age = age
  if (email) data.email = email

  try {
    const updated = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        surname: true,
        age: true,
        email: true,
        role: true
      }
    })

    return updated
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND',
        text: `User with id=${id} not found`
      })
    }
    throw error
  }
}

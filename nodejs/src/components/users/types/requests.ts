import type { UserRole } from '@prisma/client'

import type { PaginationQueryParams } from '#schemas/query/pagination'

export interface CreateUserRequestBody {
  name: string
  surname: string
  age?: number
  password: string
  email: string
}

export type UpdateUserRequestBody = Partial<
  Omit<CreateUserRequestBody, 'password'>
>
export type UpdateUserData = UpdateUserRequestBody & { id: number }

export type LoginRequestBody = {
  email: string
  password: string
}

export type TRefreshToken = {
  refreshToken: string
}

export interface UsersQueryParams extends PaginationQueryParams {
  role?: UserRole
}

export interface GetUsersOptions {
  limit: number
  offset: number
  role?: UserRole
}

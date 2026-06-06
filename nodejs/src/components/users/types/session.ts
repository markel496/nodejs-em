import type { UserRole } from '@prisma/client'

export interface UserSession {
  id: number
  name: string
  surname?: string
  email?: string
  role: UserRole
}

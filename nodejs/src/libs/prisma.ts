import { PrismaClient, Prisma } from '@prisma/client'

export const prisma = new PrismaClient()

export const connectDatabase = async () => {
  await prisma.$connect()

  console.log('✅ Database connected successfully')
}

export { Prisma }

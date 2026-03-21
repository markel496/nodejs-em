const { prisma } = require('#libs/prisma')

const getUsers = async (limit, offset, role) => {
  const where = {}

  if (role) {
    where.role = role
  }

  const users = await prisma.user.findMany({
    where,
    orderBy: { id: 'asc' },
    take: limit,
    skip: offset,
    omit: { password: true, refreshToken: true }
  })

  return users
}

module.exports = getUsers

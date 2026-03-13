const db = require('#libs/database')
const { AuthorizationError } = require('#errors')

const getUserByRefreshToken = async (refreshToken) => {
  const user = await db.oneOrNone(
    'SELECT * FROM users WHERE refresh_token = $1',
    [refreshToken]
  )

  if (!user) {
    throw new AuthorizationError({
      code: 'INVALID_TOKEN',
      text: 'Токен не валидный'
    })
  }

  return user
}

module.exports = getUserByRefreshToken

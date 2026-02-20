const db = require('#libs/database')

const getUserByRefreshToken = async (refreshToken) => {
  const user = await db.oneOrNone(
    'SELECT * FROM users WHERE refresh_token = $1',
    [refreshToken]
  )

  return user
}

module.exports = getUserByRefreshToken

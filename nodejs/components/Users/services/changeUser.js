const db = require('../../../libs/database')

const changeUser = async ({ id, name, surname }) => {
  const updatedUser = await db.oneOrNone(
    `UPDATE users
     SET name = COALESCE($2, name), surname = COALESCE($3, surname)
     WHERE id = $1
     RETURNING *`,
    [id, name, surname]
  )

  return updatedUser
}

module.exports = changeUser

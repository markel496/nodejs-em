const db = require('#libs/database')
const { NotFoundError } = require('#errors')

const updateUser = async ({ id, name, surname, age, email }) => {
  const updated = await db.oneOrNone(
    `UPDATE users
     SET
     name = COALESCE($2, name),
     surname = COALESCE($3, surname),
     age = COALESCE($4, age),
     email = COALESCE($5, email)
     WHERE id = $1
     RETURNING *`,
    [id, name, surname, age, email]
  )

  if (!updated) {
    throw new NotFoundError({
      code: 'USER_NOT_FOUND',
      text: `User with id=${id} not found`
    })
  }

  return updated
}

module.exports = updateUser

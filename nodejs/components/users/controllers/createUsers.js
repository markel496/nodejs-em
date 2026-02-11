const Ajv = require('ajv').default
const addFormats = require('ajv-formats')

const createUsersService = require('../services/createUsers')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['email'])

const schema = {
  type: 'object',
  required: ['name', 'surname', 'password', 'email'],
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    surname: { type: 'string' },
    age: { type: 'number' },
    email: { type: 'string', format: 'email' },
    password: {
      type: 'string',
      pattern:
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
    }
  }
}

const validate = ajv.compile(schema)

const createUsersController = async (req, res) => {
  const valid = validate(req.body)

  if (!valid) {
    const errors = validate.errors.map(({ message, dataPath }) => ({
      field: dataPath,
      message
    }))

    return res.status(400).json(errors)
  }
  const { name, surname, age, password, email } = req.body

  const usersData = {
    name,
    surname,
    age,
    password,
    email
  }

  await createUsersService(usersData)

  res.send('OK')
}

module.exports = createUsersController

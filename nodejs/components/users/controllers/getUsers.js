const Ajv = require('ajv').default

const getUsersService = require('../services/getUsers')

const ajv = new Ajv({ allErrors: true })
const schema = {
  type: 'object',
  required: ['limit', 'page'],
  additionalProperties: false,
  properties: {
    limit: {
      type: 'string',
      pattern: '^[1-9]\\d*$'
    },
    page: {
      type: 'string',
      pattern: '^[1-9]\\d*$'
    }
  }
}

const validate = ajv.compile(schema)

const getUsersController = async (req, res) => {
  const valid = validate(req.query)
  if (!valid) {
    const errors = validate.errors.map(({ message, dataPath }) => ({
      field: dataPath,
      message
    }))

    return res.status(400).json(errors)
  }

  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const users = await getUsersService({ limit, page })

  res.json(users)
}

module.exports = getUsersController

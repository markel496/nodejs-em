import { Ajv } from 'ajv'
import addFormatsModule from 'ajv-formats'

import { ValidationError } from '#errors'
import { BadRequestError } from '#errors'

import type { Request, Response, NextFunction, RequestHandler } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import type { ErrorObject, JSONSchemaType } from 'ajv'

type ValidationErrorItem = {
  field: string
  message?: string
}

type ErrorsList = Partial<{
  body: ValidationErrorItem[]
  query: ValidationErrorItem[]
  params: ValidationErrorItem[]
}>

const ajv = new Ajv({ allErrors: true })
const addFormats = addFormatsModule.default
addFormats(ajv, ['email'])

export abstract class BaseController<
  P = ParamsDictionary,
  ReqQuery = Query,
  ReqBody = unknown
> {
  readonly run: RequestHandler<P, unknown, ReqBody, ReqQuery>
  constructor() {
    this.controller = this.controller.bind(this)
    this.run = this.runHandler.bind(this)
  }
  protected get bodySchema(): JSONSchemaType<ReqBody> | null {
    return null
  }

  protected get querySchema(): JSONSchemaType<ReqQuery> | null {
    return null
  }

  protected get paramsSchema(): JSONSchemaType<P> | null {
    return null
  }

  protected abstract controller(
    req: Request<P, unknown, ReqBody, ReqQuery>
  ): Promise<unknown> | unknown

  #buildRequestError(error: ErrorObject): ValidationErrorItem {
    const { message, instancePath, params } = error

    const field =
      instancePath ||
      ('missingProperty' in params ? String(params.missingProperty) : '')

    return { field, message }
  }

  protected validate(req: Request<P, unknown, ReqBody, ReqQuery>): ErrorsList {
    const errorsList: ErrorsList = {}

    if (this.bodySchema) {
      const validate = ajv.compile(this.bodySchema)

      const isValid = validate(req.body)

      if (!isValid && validate.errors) {
        const errors = validate.errors.map((error) =>
          this.#buildRequestError(error)
        )
        console.log(errors)
        errorsList.body = errors
      }
    }

    if (this.querySchema) {
      const validate = ajv.compile(this.querySchema)

      const isValid = validate(req.query)

      if (!isValid && validate.errors) {
        const errors = validate.errors.map((error) =>
          this.#buildRequestError(error)
        )

        errorsList.query = errors
      }
    }

    if (this.paramsSchema) {
      const validate = ajv.compile(this.paramsSchema)

      const isValid = validate(req.params)

      if (!isValid && validate.errors) {
        const errors = validate.errors.map((error) =>
          this.#buildRequestError(error)
        )

        errorsList.params = errors
      }
    }

    return errorsList
  }

  private async runHandler(
    req: Request<P, unknown, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errorsList = this.validate(req)

      if (Object.keys(errorsList).length > 0) {
        if (errorsList.params) {
          throw new BadRequestError(errorsList)
        }

        throw new ValidationError(errorsList)
      }

      const result = await this.controller(req)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export interface ErrorData {
  code: string
  text: string
  data?: Record<string, unknown>
}

export abstract class BaseError extends Error {
  code: string
  text: string
  data?: Record<string, unknown>
  statusCode: number

  constructor(message: string, errorsData: ErrorData) {
    super(message)

    const { code, text, data } = errorsData

    this.code = code
    this.data = data
    this.text = text
    this.statusCode = 500
  }

  toJson() {
    return JSON.stringify({
      code: this.code,
      text: this.text,
      data: this.data
    })
  }

  toObject() {
    return {
      code: this.code,
      text: this.text,
      data: this.data
    }
  }
}

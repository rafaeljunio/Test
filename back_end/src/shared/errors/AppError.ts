export class AppError {
  public readonly message: any
  public readonly statusCode: any

  constructor (message: any, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

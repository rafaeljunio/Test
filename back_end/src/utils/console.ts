/* eslint-disable @typescript-eslint/no-var-requires */
const util = require('util')

export class Console {
  public readonly message: string
  public readonly statusCode: number

  constructor (object) {
    console.log(util.inspect(object, false, null, true))
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: number
      name: string
      email: string
    }
  }
}

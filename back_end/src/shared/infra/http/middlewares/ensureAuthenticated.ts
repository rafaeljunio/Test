import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userIdAndIndustry } = verify(
      token,
      auth.secret_token
    ) as IPayload

    const {
      id,
      name,
      email
    } = JSON.parse(userIdAndIndustry)

    request.user = {
      id,
      name,
      email
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}

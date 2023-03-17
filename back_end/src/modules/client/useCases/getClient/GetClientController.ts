import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetClientUseCase } from './GetClientUseCase'
import { AppError } from '@shared/errors/AppError'

class GetClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getClientUseCase = container.resolve(
      GetClientUseCase
    )

    const {
      id
    } = request.params
    const { onlyactive } = request.headers

    const getClient = await getClientUseCase.execute(
      {
        id: +id,
        onlyactive: Boolean(+onlyactive)
      })

    if (getClient instanceof AppError) return response.status(400).send(getClient)

    return response.json(getClient)
  }
}

export { GetClientController }

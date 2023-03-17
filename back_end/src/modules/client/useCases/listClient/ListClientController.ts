import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListClientUseCase } from './ListClientUseCase'
import { AppError } from '@shared/errors/AppError'

class ListClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listClientUseCase = container.resolve(
      ListClientUseCase
    )

    const {
      name
    } = request.body

    const getClient = await listClientUseCase.execute(
      {
        name
      })

    if (getClient instanceof AppError) return response.status(400).send(getClient)

    return response.json(getClient)
  }
}

export { ListClientController }

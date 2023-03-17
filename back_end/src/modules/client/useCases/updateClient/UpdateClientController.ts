import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateClientUseCase } from './UpdateClientUseCase'
import { AppError } from '@shared/errors/AppError'

class UpdateClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const updateClientUseCase = container.resolve(
      UpdateClientUseCase
    )

    const { id } = request.params

    const {
      name,
      street,
      complement,
      neighborhood,
      city,
      state,
      zip_code,
      status
    } = request.body

    const updateClient = await updateClientUseCase.execute(
      request.user,
      {
        id: +id,
        name,
        street,
        complement,
        neighborhood,
        city,
        state,
        zip_code,
        status
      })

    if (updateClient instanceof AppError) return response.status(400).send(updateClient)

    return response.json(updateClient)
  }
}

export { UpdateClientController }

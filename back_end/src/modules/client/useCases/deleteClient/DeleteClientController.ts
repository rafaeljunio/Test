import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteClientUseCase } from './DeleteClientUseCase'
import { AppError } from '@shared/errors/AppError'

class DeleteClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const deleteClientUseCase = container.resolve(
      DeleteClientUseCase
    )

    const {
      id
    } = request.params

    const deleteClient = await deleteClientUseCase.execute(
      {
        id: +id
      })

    if (deleteClient instanceof AppError) return response.status(400).send(deleteClient)

    return response.json(deleteClient)
  }
}

export { DeleteClientController }

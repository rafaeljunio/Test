import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateClientUseCase } from './CreateClientUseCase'
import { AppError } from '@shared/errors/AppError'

class CreateClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createClientUseCase = container.resolve(
      CreateClientUseCase
    )

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

    const createClient = await createClientUseCase.execute(
      request.user,
      {
        name,
        street,
        complement,
        neighborhood,
        city,
        state,
        zip_code,
        status
      })

    if (createClient instanceof AppError) return response.status(400).send(createClient)

    return response.json(createClient)
  }
}

export { CreateClientController }

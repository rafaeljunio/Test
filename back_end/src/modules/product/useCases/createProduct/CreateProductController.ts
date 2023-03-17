import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateProductUseCase } from './CreateProductUseCase'
import { AppError } from '@shared/errors/AppError'

class CreateProductController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createProductUseCase = container.resolve(
      CreateProductUseCase
    )

    const {
      description,
      unit_value,
      unit_of_measurement,
      status
    } = request.body

    const createUser = await createProductUseCase.execute(
      request.user,
      {
        description,
        unit_value,
        unit_of_measurement,
        status
      })

    if (createUser instanceof AppError) return response.status(400).send(createUser)

    return response.json(createUser)
  }
}

export { CreateProductController }

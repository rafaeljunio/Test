import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateProductUseCase } from './UpdateProductUseCase'
import { AppError } from '@shared/errors/AppError'

class UpdateProductController {
  async handle (request: Request, response: Response): Promise<Response> {
    const updateProductUseCase = container.resolve(
      UpdateProductUseCase
    )

    const { id } = request.params

    const {
      description,
      unit_value,
      unit_of_measurement,
      status
    } = request.body

    const updateProduct = await updateProductUseCase.execute(
      request.user,
      {
        id: +id,
        description,
        unit_value,
        unit_of_measurement,
        status
      })

    if (updateProduct instanceof AppError) return response.status(400).send(updateProduct)

    return response.json(updateProduct)
  }
}

export { UpdateProductController }

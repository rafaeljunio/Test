import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteProductUseCase } from './DeleteProductUseCase'
import { AppError } from '@shared/errors/AppError'

class DeleteProductController {
  async handle (request: Request, response: Response): Promise<Response> {
    const deleteProductUseCase = container.resolve(
      DeleteProductUseCase
    )

    const {
      id
    } = request.params

    const deleteProduct = await deleteProductUseCase.execute(
      {
        id: +id
      })

    if (deleteProduct instanceof AppError) return response.status(400).send(deleteProduct)

    return response.json(deleteProduct)
  }
}

export { DeleteProductController }

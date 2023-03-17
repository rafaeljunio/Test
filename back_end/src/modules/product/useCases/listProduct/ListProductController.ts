import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListProductUseCase } from './ListProductUseCase'
import { AppError } from '@shared/errors/AppError'

class ListProductController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listProductUseCase = container.resolve(
      ListProductUseCase
    )

    const {
      description
    } = request.body

    const getProduct = await listProductUseCase.execute(
      {
        description
      })

    if (getProduct instanceof AppError) return response.status(400).send(getProduct)

    return response.json(getProduct)
  }
}

export { ListProductController }

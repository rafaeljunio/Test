import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetProductUseCase } from './GetProductUseCase'
import { AppError } from '@shared/errors/AppError'

class GetProductController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getProductUseCase = container.resolve(
      GetProductUseCase
    )

    const {
      id
    } = request.params

    const { onlyactive } = request.headers

    const getProduct = await getProductUseCase.execute(
      {
        id: +id,
        onlyactive: Boolean(+onlyactive)
      })

    if (getProduct instanceof AppError) return response.status(400).send(getProduct)

    return response.json(getProduct)
  }
}

export { GetProductController }

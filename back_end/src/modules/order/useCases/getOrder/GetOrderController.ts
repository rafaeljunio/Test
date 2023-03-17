import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetOrderUseCase } from './GetOrderUseCase'
import { AppError } from '@shared/errors/AppError'

class GetOrderController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getOrderUseCase = container.resolve(
      GetOrderUseCase
    )

    const {
      id
    } = request.params

    const getOrder = await getOrderUseCase.execute(
      {
        id: +id
      })

    if (getOrder instanceof AppError) return response.status(400).send(getOrder)

    return response.json(getOrder)
  }
}

export { GetOrderController }

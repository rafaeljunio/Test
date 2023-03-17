import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateOrderUseCase } from './UpdateOrderUseCase'
import { AppError } from '@shared/errors/AppError'

class UpdateOrderController {
  async handle (request: Request, response: Response): Promise<Response> {
    const updateOrderUseCase = container.resolve(
      UpdateOrderUseCase
    )

    const { id } = request.params

    const {
      client_id,
      order_products,
      status
    } = request.body

    const updateOrder = await updateOrderUseCase.execute(
      request.user,
      {
        id: +id,
        client_id,
        order_products,
        status
      })

    if (updateOrder instanceof AppError) return response.status(400).send(updateOrder)

    return response.json(updateOrder)
  }
}

export { UpdateOrderController }

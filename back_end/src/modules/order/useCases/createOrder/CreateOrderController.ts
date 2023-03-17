import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateOrderUseCase } from './CreateOrderUseCase'
import { AppError } from '@shared/errors/AppError'

class CreateOrderController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createOrderUseCase = container.resolve(
      CreateOrderUseCase
    )

    const {
      client_id,
      order_products,
      status
    } = request.body

    const createUser = await createOrderUseCase.execute(
      request.user,
      {
        client_id,
        order_products,
        status
      })

    if (createUser instanceof AppError) return response.status(400).send(createUser)

    return response.json(createUser)
  }
}

export { CreateOrderController }

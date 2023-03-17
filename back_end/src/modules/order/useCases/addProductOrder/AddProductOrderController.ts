import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AddProductOrderUseCase } from './AddProductOrderUseCase'
import { AppError } from '@shared/errors/AppError'

class AddProductOrderController {
  async handle (request: Request, response: Response): Promise<Response> {
    const addProductOrderUseCase = container.resolve(
      AddProductOrderUseCase
    )

    const {
      order_id,
      product_id,
      quantity,
      unit_value
    } = request.body

    const createUser = await addProductOrderUseCase.execute(
      request.user,
      {
        order_id,
        product_id,
        quantity,
        unit_value
      })

    if (createUser instanceof AppError) return response.status(400).send(createUser)

    return response.json(createUser)
  }
}

export { AddProductOrderController }

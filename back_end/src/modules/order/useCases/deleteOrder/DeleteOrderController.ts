import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteOrderUseCase } from './DeleteOrderUseCase'
import { AppError } from '@shared/errors/AppError'

class DeleteOrderController {
  async handle (request: Request, response: Response): Promise<Response> {
    const deleteOrderUseCase = container.resolve(
      DeleteOrderUseCase
    )

    const {
      id
    } = request.params

    const deleteOrder = await deleteOrderUseCase.execute(
      {
        id: +id
      })

    if (deleteOrder instanceof AppError) return response.status(400).send(deleteOrder)

    return response.json(deleteOrder)
  }
}

export { DeleteOrderController }

import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListOrderUseCase } from './ListOrderUseCase'
import { AppError } from '@shared/errors/AppError'

class ListOrderController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listOrderUseCase = container.resolve(
      ListOrderUseCase
    )

    const getOrder = await listOrderUseCase.execute()

    if (getOrder instanceof AppError) return response.status(400).send(getOrder)

    return response.json(getOrder)
  }
}

export { ListOrderController }

import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RemoveProductOrderUseCase } from './RemoveProductOrderUseCase'
import { AppError } from '@shared/errors/AppError'

class RemoveProductOrderController {
  async handle (request: Request, response: Response): Promise<Response> {
    const removeProductOrderUseCase = container.resolve(
      RemoveProductOrderUseCase
    )

    const {
      id
    } = request.params

    const createUser = await removeProductOrderUseCase.execute(
      request.user,
      {
        id: +id
      })

    if (createUser instanceof AppError) return response.status(400).send(createUser)

    return response.json(createUser)
  }
}

export { RemoveProductOrderController }

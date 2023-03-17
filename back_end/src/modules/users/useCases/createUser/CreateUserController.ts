import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'
import { AppError } from '@shared/errors/AppError'

class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(
      CreateUserUseCase
    )

    const { name, email, password } = request.body

    const createUser = await createUserUseCase.execute({
      name,
      email,
      password
    })

    if (createUser instanceof AppError) return response.status(400).send(createUser)

    return response.json(createUser)
  }
}

export { CreateUserController }

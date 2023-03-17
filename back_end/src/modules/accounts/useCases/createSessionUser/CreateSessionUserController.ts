import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateSessionUserUseCase } from './CreateSessionUserUseCase'

class CreateSessionUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const createSessionUserUseCase = container.resolve(CreateSessionUserUseCase)

    const token = await createSessionUserUseCase.execute({
      email,
      password
    })

    return response.json(token)
  }
}

export { CreateSessionUserController }

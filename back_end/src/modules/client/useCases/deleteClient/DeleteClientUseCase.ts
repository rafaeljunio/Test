
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IClientRepository } from '@modules/client/repositories/IClientRepository'
import { Client } from '@modules/client/infra/typeorm/entities/Client'

interface DeleteClientProps {
  id: number
}

@injectable()
class DeleteClientUseCase {
  constructor (
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  async execute (
    {
      id
    }: DeleteClientProps): Promise<boolean | AppError> {
    try {
      await this.clientRepository.delete(id)

      return true
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { DeleteClientUseCase }

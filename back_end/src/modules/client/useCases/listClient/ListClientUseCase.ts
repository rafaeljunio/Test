
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IClientRepository } from '@modules/client/repositories/IClientRepository'
import { Client } from '@modules/client/infra/typeorm/entities/Client'

interface ListClientProps {
  name: string
}

@injectable()
class ListClientUseCase {
  constructor (
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  async execute (
    {
      name
    }: ListClientProps): Promise<Client[] | AppError> {
    try {
      const clients = await this.clientRepository.list(name)

      return clients
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { ListClientUseCase }

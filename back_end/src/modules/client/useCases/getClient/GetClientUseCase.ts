
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IClientRepository } from '@modules/client/repositories/IClientRepository'
import { Client } from '@modules/client/infra/typeorm/entities/Client'

interface GetClientProps {
  id: number
  onlyactive: boolean
}

@injectable()
class GetClientUseCase {
  constructor (
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  async execute (
    {
      id,
      onlyactive
    }: GetClientProps): Promise<Client | AppError> {
    try {
      const client = await this.clientRepository.get(id, onlyactive)

      return client
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { GetClientUseCase }

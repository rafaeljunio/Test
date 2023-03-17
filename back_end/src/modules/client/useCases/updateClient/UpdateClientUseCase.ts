import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IClientRepository } from '@modules/client/repositories/IClientRepository'
import { Client } from '@modules/client/infra/typeorm/entities/Client'

interface UpdateClientProps {
  id: number
  name: string
  street: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  status: 'active' | 'inactive' | 'in construction'
}

@injectable()
class UpdateClientUseCase {
  constructor (
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  async execute (
    request_user: Express.Request['user'],
    {
      id,
      name,
      street,
      complement,
      neighborhood,
      city,
      state,
      zip_code,
      status
    }: UpdateClientProps): Promise<Client | AppError> {
    try {
      const now = new Date()

      const clientSaved = await this.clientRepository.update({
        id,
        name,
        street,
        complement,
        neighborhood,
        city,
        state,
        zip_code,
        updated_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        user_updated_at: request_user.id,
        status
      })

      return clientSaved
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { UpdateClientUseCase }

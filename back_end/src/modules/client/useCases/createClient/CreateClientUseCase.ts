import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IClientRepository } from '@modules/client/repositories/IClientRepository'
import { Client } from '@modules/client/infra/typeorm/entities/Client'

interface CreateClientProps {
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
class CreateClientUseCase {
  constructor (
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository
  ) {}

  async execute (
    request_user: Express.Request['user'],
    {
      name,
      street,
      complement,
      neighborhood,
      city,
      state,
      zip_code,
      status
    }: CreateClientProps): Promise<Client | AppError> {
    try {
      const now = new Date()

      const clientSaved = await this.clientRepository.create({
        name,
        street,
        complement,
        neighborhood,
        city,
        state,
        zip_code,
        status,
        created_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        updated_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        user_created_at: request_user.id,
        user_updated_at: request_user.id
      })

      return clientSaved
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { CreateClientUseCase }

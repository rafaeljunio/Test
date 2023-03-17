/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm'

import { Client } from '../entities/Client'
import { IClientRepository } from '@modules/client/repositories/IClientRepository'

class ClientRepository implements IClientRepository {
  private readonly repository: Repository<Client>

  constructor () {
    this.repository = getRepository(Client)
  }

  async create ({
    name,
    street,
    complement,
    neighborhood,
    city,
    state,
    zip_code,
    created_at,
    updated_at,
    user_created_at,
    user_updated_at,
    status
  }: Client): Promise<Client> {
    const client = this.repository.create({
      name,
      street,
      complement,
      neighborhood,
      city,
      state,
      zip_code,
      created_at,
      updated_at,
      user_created_at,
      user_updated_at,
      status
    })

    await this.repository.save(client)

    return client
  }

  async update ({
    id,
    name,
    street,
    complement,
    neighborhood,
    city,
    state,
    zip_code,
    created_at,
    updated_at,
    user_created_at,
    user_updated_at,
    status
  }: Client): Promise<Client> {
    const client = await this.repository.findOne(id)

    if (client) {
      client.name = name
      client.street = street
      client.complement = complement
      client.neighborhood = neighborhood
      client.city = city
      client.state = state
      client.zip_code = zip_code
      client.created_at = created_at
      client.updated_at = updated_at
      client.user_created_at = user_created_at
      client.user_updated_at = user_updated_at
      client.status = status

      await this.repository.save(client)
    }

    return client
  }

  async get (id: number, onlyactive: boolean): Promise<Client> {
    let queryBuilder = this.repository.createQueryBuilder('cli')
      .where('cli.id = :id', { id })

    if (onlyactive) {
      queryBuilder = queryBuilder.andWhere('cli.status = :status', { status: 'active' })
    }

    const client = await queryBuilder.getOne()

    return client
  }

  async list (name: string): Promise<Client[]> {
    const clients = await this.repository
      .createQueryBuilder('cli')
      .where('cli.name LIKE :name', { name: `%${name}%` })
      .getMany()

    return clients
  }

  async delete (id: number): Promise<boolean> {
    await this.repository
      .createQueryBuilder('clients')
      .delete()
      .from(Client)
      .where('id = :id', { id })
      .execute()

    return true
  }
}

export { ClientRepository }

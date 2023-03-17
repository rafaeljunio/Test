import { Client } from '../infra/typeorm/entities/Client'

interface IClientRepository {
  create: (client: Client) => Promise<Client>
  update: (client: Client) => Promise<Client>
  get: (id: number, onlyactive: boolean) => Promise<Client>
  list: (name: string) => Promise<Client[]>
  delete: (id: number) => Promise<boolean>

}

export { IClientRepository }

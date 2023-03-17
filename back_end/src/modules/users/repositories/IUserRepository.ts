import { User } from '@modules/accounts/infra/typeorm/entities/User'

interface IUserRepository {
  list: () => Promise<any>
  create: (user) => Promise<any>
  findByEmail: (email: string) => Promise<User>
}

export { IUserRepository }

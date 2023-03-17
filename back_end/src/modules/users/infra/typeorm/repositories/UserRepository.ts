/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '../entities/User'

class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>

  constructor () {
    this.repository = getRepository(User)
  }

  async list (): Promise<any> {
    const stringSQL = `
      SELECT
        *
      FROM dbo.users
    `

    const list = await this.repository.manager
      .query(stringSQL)
      .catch(error => {
        throw error
      })

    return list
  }

  async create (user): Promise<any> {
    const stringSQL = `
      INSERT INTO dbo.users (
        name,
        email,
        password,
        created_at
      ) VALUES (
        '${user.name}',
        '${user.email}',
        '${user.password}',
        '${user.created_at}'
      )
    `

    const list = await this.repository.manager
      .query(stringSQL)
      .catch(error => {
        throw error
      })

    return list
  }

  async findByEmail (email: string): Promise<User> {
    const userFound = await this.repository
      .createQueryBuilder('usr')
      .where('usr.email LIKE :email', { email })
      .getOne()

    return userFound
  }
}

export { UserRepository }

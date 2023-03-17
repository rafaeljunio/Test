/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm'

import { UserToken } from '../entities/UserToken'
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'

class UserTokenRepository implements IUserTokenRepository {
  private readonly repository: Repository<UserToken>

  constructor () {
    this.repository = getRepository(UserToken)
  }

  async create ({
    user_id,
    expires_date,
    refresh_token
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    })

    await this.repository.save(userToken)

    return userToken
  }
}

export { UserTokenRepository }

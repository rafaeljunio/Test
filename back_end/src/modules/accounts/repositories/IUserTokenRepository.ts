import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserToken } from '../infra/typeorm/entities/UserToken'

interface IUserTokenRepository {
  create: (data: ICreateUserTokenDTO) => Promise<UserToken>
}

export { IUserTokenRepository }

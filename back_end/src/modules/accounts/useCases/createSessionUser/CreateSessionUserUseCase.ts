import 'reflect-metadata'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'

interface CreateSessionProps {
  email: string
  password: string
}

interface IResponse {
  token: string
  id: number
  name: string
  email: string
  refresh_token: string
}

@injectable()
class CreateSessionUserUseCase {
  constructor (
    @inject('DayjsDateProvider')
    private readonly dateProvider: DayjsDateProvider,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository
  ) {}

  async execute ({ email, password }: CreateSessionProps): Promise<any> {
    const responseJson: any = {}

    const subjectParams = {}

    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    let userFound: User

    try {
      userFound = await this.userRepository.findByEmail(email)
    } catch (error) {
      console.log(error)
      throw new AppError('email or password incorrect', 401)
    }

    if (!userFound) {
      throw new AppError('email or password incorrect', 401)
    }

    if (userFound.password) {
      const passwordMatch = await compare(password, userFound.password)

      if (!passwordMatch) {
        throw new AppError('email or password incorrect___', 401)
      }
    }

    Object.assign(subjectParams, {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email
    })

    const token = sign({}, secret_token, {
      subject: JSON.stringify(subjectParams),
      expiresIn: expires_in_token
    })

    // await this.userTokenRepository.deleteExpiredTokensByUser(userFound.id)

    const refresh_token = sign({ userFound }, secret_refresh_token, {
      subject: JSON.stringify(subjectParams),
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    )

    await this.userTokenRepository.create({
      user_id: userFound.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    })

    const tokenReturn: IResponse = {
      token,
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      refresh_token
    }

    return tokenReturn
  }
}

export { CreateSessionUserUseCase }

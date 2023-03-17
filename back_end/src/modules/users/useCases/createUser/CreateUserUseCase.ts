import { hash } from 'bcryptjs'
import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'

import { AppError } from '@shared/errors/AppError'

interface CreateUserProps {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserUseCase {
  constructor (
    @inject('UserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute ({
    name,
    email,
    password
  }: CreateUserProps): Promise<boolean | AppError> {
    try {
      const userExists = await this.userRepository.findByEmail(email)

      if (userExists) {
        throw 'user already exists'
      }

      const regexSpecialChars = /\W|_/
      const regexNumber = /[0-9]/

      if (password.toLowerCase() == password) {
        throw 'password without upper letters'
      }

      if (password.length < 8) {
        throw 'password without quantity minimum chars'
      }

      if (!regexSpecialChars.test(password)) {
        throw 'password without special chars'
      }

      if (!regexNumber.test(password)) {
        throw 'password without some number'
      }

      const passwordHash = await hash(password, 10)

      const now = new Date()

      await this.userRepository.create({
        name,
        email,
        password: passwordHash,
        created_at: date.format(now, 'YYYY-MM-DD HH:mm:ss')
      })

      return true
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { CreateUserUseCase }

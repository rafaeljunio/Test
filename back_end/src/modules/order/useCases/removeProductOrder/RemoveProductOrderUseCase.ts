/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'
import { Product } from '@modules/product/infra/typeorm/entities/Product'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'

interface RemoveProductOrderUseCaseProps {
  id: number
}

@injectable()
class RemoveProductOrderUseCase {
  constructor (
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (
    request_user: Express.Request['user'],
    {
      id
    }: RemoveProductOrderUseCaseProps): Promise<boolean | AppError> {
    try {
      const now = new Date()

      await this.orderRepository.removeOrderProduct(id)

      return true
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { RemoveProductOrderUseCase }

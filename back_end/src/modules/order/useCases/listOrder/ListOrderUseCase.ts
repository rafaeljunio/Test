
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { Order } from '@modules/order/infra/typeorm/entities/Order'

interface ListOrderProps {
  name: string
}

@injectable()
class ListOrderUseCase {
  constructor (
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (): Promise<Order[] | AppError> {
    try {
      const orders = await this.orderRepository.list()

      return orders
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { ListOrderUseCase }

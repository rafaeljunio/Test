
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { Order } from '@modules/order/infra/typeorm/entities/Order'

interface DeleteOrderProps {
  id: number
}

@injectable()
class DeleteOrderUseCase {
  constructor (
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (
    {
      id
    }: DeleteOrderProps): Promise<boolean | AppError> {
    try {
      await this.orderRepository.delete(id)

      return true
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { DeleteOrderUseCase }

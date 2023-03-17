import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { Order } from '@modules/order/infra/typeorm/entities/Order'

interface CreateOrderProps {
  client_id: number
  order_products: Array<{
    product_id: number
    quantity: number
    unit_value: number
  }>
  status: 'active' | 'inactive' | 'in construction'
}

@injectable()
class CreateOrderUseCase {
  constructor (
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (
    request_user: Express.Request['user'],
    {
      client_id,
      order_products,
      status
    }: CreateOrderProps): Promise<Order | AppError> {
    try {
      const now = new Date()

      const orderSaved = await this.orderRepository.create({
        client_id,
        order_products,
        status,
        created_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        updated_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        user_created_at: request_user.id,
        user_updated_at: request_user.id
      })

      return orderSaved
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { CreateOrderUseCase }

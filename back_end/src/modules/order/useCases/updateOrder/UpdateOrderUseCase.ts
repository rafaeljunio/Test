import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { Order } from '@modules/order/infra/typeorm/entities/Order'

interface UpdateOrderProps {
  id: number
  client_id: number
  order_products: Array<{
    product_id: number
    quantity: number
    unit_value: number
  }>
  status: 'active' | 'inactive' | 'in construction'
}

@injectable()
class UpdateOrderUseCase {
  constructor (
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (
    request_user: Express.Request['user'],
    {
      id,
      client_id,
      order_products,
      status
    }: UpdateOrderProps): Promise<Order | AppError> {
    try {
      const now = new Date()

      // const orderSaved = await this.orderRepository.update({
      //   id,
      //   client_id,
      //   order_products,
      //   status,
      //   updated_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
      //   user_updated_at: request_user.id
      // })

      // return orderSaved
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { UpdateOrderUseCase }

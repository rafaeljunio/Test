/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'
import { Product } from '@modules/product/infra/typeorm/entities/Product'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'

interface AddProductOrderProps {
  order_id: number
  product_id: number
  quantity: number
  unit_value: number
}

@injectable()
class AddProductOrderUseCase {
  constructor (
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (
    request_user: Express.Request['user'],
    {
      order_id,
      product_id,
      quantity,
      unit_value
    }: AddProductOrderProps): Promise<Product | AppError> {
    try {
      const now = new Date()

      const productSaved = await this.orderRepository.addProduct({
        order_id,
        product_id,
        quantity,
        status: 'active',
        created_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        updated_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        user_created_at: request_user.id,
        user_updated_at: request_user.id,
        unit_value
      })

      // if (productSaved) {
      //   const order = await this.orderRepository.get(id)

      //   return order
      // }

      // return []
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { AddProductOrderUseCase }

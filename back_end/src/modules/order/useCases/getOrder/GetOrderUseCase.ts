
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { Order } from '@modules/order/infra/typeorm/entities/Order'

const shape = require('shape-json')

interface GetOrderProps {
  id: number
}

@injectable()
class GetOrderUseCase {
  constructor (
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (
    {
      id
    }: GetOrderProps): Promise<Order | AppError> {
    try {
      const orderRaw = await this.orderRepository.get(id)

      const scheme = {
        '$group(order_id)': {
          order_id: 'order_id',
          client: {
            id: 'client_id',
            name: 'name',
            street: 'street',
            neighborhood: 'neighborhood',
            city: 'city',
            state: 'state',
            zip_code: 'zip_code',
            complement: 'complement'
          },
          '$group[products](order_product_id)': {
            id: 'order_product_id',
            product_id: 'product_id',
            quantity: 'quantity',
            description: 'description',
            unit_value: 'unit_value',
            unit_of_measurement: 'unit_of_measurement'
          }
        }
      }

      const orderResult = shape.parse(orderRaw, scheme)

      return orderResult[0]
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { GetOrderUseCase }

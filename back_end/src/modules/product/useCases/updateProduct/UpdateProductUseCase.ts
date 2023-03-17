import date from 'date-and-time'

import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'
import { Product } from '@modules/product/infra/typeorm/entities/Product'

interface UpdateProductProps {
  id: number
  description: string
  unit_value: number
  unit_of_measurement: string
  status: 'active' | 'inactive' | 'in construction'
}

@injectable()
class UpdateProductUseCase {
  constructor (
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  async execute (
    request_user: Express.Request['user'],
    {
      id,
      description,
      unit_value,
      unit_of_measurement,
      status
    }: UpdateProductProps): Promise<Product | AppError> {
    try {
      const now = new Date()

      const productSaved = await this.productRepository.update({
        id,
        description,
        unit_value,
        unit_of_measurement,
        status,
        updated_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        user_updated_at: request_user.id
      })

      return productSaved
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { UpdateProductUseCase }

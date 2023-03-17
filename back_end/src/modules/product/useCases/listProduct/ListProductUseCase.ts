
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'
import { Product } from '@modules/product/infra/typeorm/entities/Product'

interface ListProductProps {
  description: string
}

@injectable()
class ListProductUseCase {
  constructor (
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  async execute (
    {
      description
    }: ListProductProps): Promise<Product[] | AppError> {
    try {
      const products = await this.productRepository.list(description)

      return products
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { ListProductUseCase }


import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'
import { Product } from '@modules/product/infra/typeorm/entities/Product'

interface GetProductProps {
  id: number
  onlyactive: boolean
}

@injectable()
class GetProductUseCase {
  constructor (
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  async execute (
    {
      id,
      onlyactive
    }: GetProductProps): Promise<Product | AppError> {
    try {
      const product = await this.productRepository.get(id, onlyactive)

      return product
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { GetProductUseCase }


import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'
import { Product } from '@modules/product/infra/typeorm/entities/Product'

interface DeleteProductProps {
  id: number
}

@injectable()
class DeleteProductUseCase {
  constructor (
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  async execute (
    {
      id
    }: DeleteProductProps): Promise<boolean | AppError> {
    try {
      await this.productRepository.delete(id)

      return true
    } catch (error) {
      return new AppError(error)
    }
  }
}

export { DeleteProductUseCase }

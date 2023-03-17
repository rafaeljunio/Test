import { Product } from '../infra/typeorm/entities/Product'

interface IProductRepository {
  create: (product: Product) => Promise<Product>
  update: (product: Product) => Promise<Product>
  get: (id: number, onlyactive: boolean) => Promise<Product>
  list: (description: string) => Promise<Product[]>
  delete: (id: number) => Promise<boolean>
}

export { IProductRepository }

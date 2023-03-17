/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm'

import { Product } from '../entities/Product'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'

class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>

  constructor () {
    this.repository = getRepository(Product)
  }

  async create ({
    description,
    unit_value,
    unit_of_measurement,
    created_at,
    updated_at,
    user_created_at,
    user_updated_at,
    status
  }: Product): Promise<Product> {
    const product = this.repository.create({
      description,
      unit_value,
      unit_of_measurement,
      status,
      created_at,
      updated_at,
      user_created_at,
      user_updated_at
    })

    await this.repository.save(product)

    return product
  }

  async update ({
    id,
    description,
    unit_value,
    unit_of_measurement,
    created_at,
    updated_at,
    user_created_at,
    user_updated_at,
    status
  }: Product): Promise<Product> {
    const product = await this.repository.findOne(id)

    if (product) {
      product.description = description
      product.unit_value = unit_value
      product.unit_of_measurement = unit_of_measurement
      product.created_at = created_at
      product.updated_at = updated_at
      product.user_created_at = user_created_at
      product.user_updated_at = user_updated_at
      product.status = status

      await this.repository.save(product)
    }

    return product
  }

  async get (id: number, onlyactive: boolean): Promise<Product> {
    let queryBuilder = this.repository.createQueryBuilder('pro')
      .where('pro.id = :id', { id })

    if (onlyactive) {
      queryBuilder = queryBuilder.andWhere('pro.status = :status', { status: 'active' })
    }

    const product = await queryBuilder.getOne()

    return product
  }

  async list (description: string): Promise<Product[]> {
    const products = await this.repository
      .createQueryBuilder('cli')
      .where('cli.description LIKE :description', { description: `%${description}%` })
      .getMany()

    return products
  }

  async delete (id: number): Promise<boolean> {
    await this.repository
      .createQueryBuilder('products')
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .execute()

    return true
  }
}

export { ProductRepository }

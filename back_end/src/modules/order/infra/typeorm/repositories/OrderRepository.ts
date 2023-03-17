/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm'

import { Order } from '../entities/Order'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { ICreateOrderDTO } from '@modules/order/dtos/ICreateOrderDTO'
import { OrderProduct } from '../entities/OrderProduct'

class OrderRepository implements IOrderRepository {
  private readonly repository: Repository<Order>
  private readonly repositoryOrderProduct: Repository<OrderProduct>

  constructor () {
    this.repository = getRepository(Order)
    this.repositoryOrderProduct = getRepository(OrderProduct)
  }

  async create ({
    client_id,
    order_products,
    created_at,
    updated_at,
    user_created_at,
    user_updated_at,
    status
  }: ICreateOrderDTO): Promise<any> {
    const order = this.repository.create({
      client_id,
      status,
      created_at,
      updated_at,
      user_created_at,
      user_updated_at
    })

    const orderSaved = await this.repository.save(order)

    order_products.forEach(async orderProduct => {
      const order_product = this.repositoryOrderProduct.create({
        order_id: orderSaved.id,
        product_id: orderProduct.product_id,
        quantity: orderProduct.quantity,
        unit_value: orderProduct.unit_value,
        status,
        created_at,
        updated_at,
        user_created_at,
        user_updated_at
      })

      await this.repositoryOrderProduct.save(order_product)
    })

    return order
  }

  async update ({
    id,
    client_id,
    order_products,
    created_at,
    updated_at,
    user_created_at,
    user_updated_at,
    status
  }: ICreateOrderDTO): Promise<any> {
    // const order = await this.repository.findOne(id)

    // order_products.forEach(async orderProduct => {
    //   const order_product = this.repositoryOrderProduct.create({
    //     order_id: order.id,
    //     product_id: orderProduct.product_id,
    //     quantity: orderProduct.quantity,
    //     unit_value: orderProduct.unit_value,
    //     status,
    //     created_at,
    //     updated_at,
    //     user_created_at,
    //     user_updated_at
    //   })
    // })

    // await this.repositoryOrderProduct.save(order_product)

    // return order
  }

  async get (id: number): Promise<any> {
    const sqlQuery = `
      SELECT
        op.id order_product_id,
        *
      FROM dbo.orders o
      LEFT JOIN dbo.order_products op
      ON o.id = op.order_id
      LEFT JOIN dbo.clients c
      ON c.id = o.client_id
      LEFT JOIN dbo.products p
      ON op.product_id = p.id
      WHERE
        o.id = ${id}
    `

    const order = await this.repository.manager
      .query(sqlQuery)
      .catch(error => {
        throw error
      })

    return order
  }

  async list (): Promise<Order[]> {
    const sqlQuery = `
      SELECT
        o.id order_id,
        *
      FROM dbo.orders o
      INNER JOIN dbo.clients c
      ON c.id = o.client_id
    `

    const listOrders: Order[] = await this.repository.manager
      .query(sqlQuery)
      .catch(error => {
        throw error
      })

    return listOrders
  }

  async delete (id: number): Promise<boolean> {
    await this.repository
      .createQueryBuilder('orders')
      .delete()
      .from(Order)
      .where('id = :id', { id })
      .execute()

    return true
  }

  async addProduct ({
    order_id,
    product_id,
    quantity,
    status,
    created_at,
    updated_at,
    user_created_at,
    user_updated_at,
    unit_value
  }: any): Promise<any> {
    const sqlQuery = `
      INSERT INTO dbo.order_products (
        order_id,
        product_id,
        quantity,
        status,
        created_at,
        updated_at,
        user_created_at,
        user_updated_at,
        unit_value
      ) VALUES (
        ${order_id},
        ${product_id},
        ${quantity},
        '${status}',
        '${created_at}',
        '${updated_at}',
        ${user_created_at},
        ${user_updated_at},
        ${unit_value}
      )
    `

    await this.repository.manager
      .query(sqlQuery)
      .catch(error => {
        throw error
      })

    return true
  }

  async removeOrderProduct (id: number): Promise<any> {
    const sqlQuery = `
      DELETE FROM dbo.order_products WHERE id = ${id}
    `

    await this.repository.manager
      .query(sqlQuery)
      .catch(error => {
        throw error
      })

    return true
  }
}

export { OrderRepository }

import { Product } from '@modules/product/infra/typeorm/entities/Product'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Order } from './Order'

@Entity('dbo.order_products')
class OrderProduct {
  @PrimaryGeneratedColumn()
    id?: number

  @Column()
    order_id: number

  @Column()
    product_id: number

  @Column()
    quantity: number

  @Column()
    unit_value: number

  @Column()
    status: 'active' | 'inactive' | 'in construction'

  @Column()
    created_at?: string

  @Column()
    updated_at: string

  @Column()
    user_created_at?: number

  @Column()
    user_updated_at: number
}

export { OrderProduct }

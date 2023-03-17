import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('dbo.products')
class Product {
  @PrimaryGeneratedColumn()
    id?: number

  @Column()
    description: string

  @Column()
    unit_value: number

  @Column()
    unit_of_measurement: string

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

export { Product }

import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('dbo.orders')
class Order {
  @PrimaryGeneratedColumn()
    id?: number

  @Column()
    client_id: number

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

  // @ManyToOne(type => Client, client => client.orders)
  //   client: Client
}

export { Order }

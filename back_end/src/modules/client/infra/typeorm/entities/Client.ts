import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('dbo.clients')
class Client {
  @PrimaryGeneratedColumn()
    id?: number

  @Column()
    name: string

  @Column()
    street: string

  @Column()
    neighborhood: string

  @Column()
    city: string

  @Column()
    state: string

  @Column()
    zip_code: string

  @Column()
    complement: string

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

export { Client }

import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column()
    email: string

  @Column()
    password: string
}

export { User }

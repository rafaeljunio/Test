import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('dbo.user_tokens')
class UserToken {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    user_id: number

  @Column()
    refresh_token: string

  @Column()
    expires_date: Date
}

export { UserToken }
